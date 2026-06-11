import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors())
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
})

const PORT = 3001

interface Customer {
  id: number
  name: string
  email: string
  company: { name: string }
}

interface OrderDto {
  id: string
  total: number
}

interface ProductDto {
  id: number
  name: string
  price: number
}

interface Database {
  customers: Record<string, Customer>
  products: ProductDto[]
  orders: Record<string, OrderDto[]>
}

// Persistent, deterministic data loaded from db.json (read once at startup).
const dbPath = join(dirname(fileURLToPath(import.meta.url)), 'db.json')
const db: Database = JSON.parse(readFileSync(dbPath, 'utf-8'))

// Random latency only - simulates a real server without making the data random.
function randomDelay(): Promise<void> {
  const delay = 200 + Math.floor(Math.random() * 700)
  return new Promise((resolve) => setTimeout(resolve, delay))
}

function parseCustomerId(raw: string): number | null {
  const id = Number(raw)
  return Number.isInteger(id) && id >= 1 ? id : null
}

app.get('/api/customers/:customerId', async (req, res) => {
  await randomDelay()

  const customerId = parseCustomerId(req.params.customerId)
  if (customerId === null) {
    res.status(400).json({ error: 'Invalid customerId' })
    return
  }

  const customer = db.customers[customerId]
  if (!customer) {
    res.status(404).json({ error: 'Customer not found' })
    return
  }

  res.json(customer)
})

app.get('/api/customers/:customerId/orders', async (req, res) => {
  await randomDelay()

  const customerId = parseCustomerId(req.params.customerId)
  if (customerId === null) {
    res.status(400).json({ error: 'Invalid customerId' })
    return
  }

  res.json(db.orders[customerId] ?? [])
})

// Products are seeded from db.json; mutations stay in memory until restart.
app.get('/api/products', async (_req, res) => {
  await randomDelay()
  res.json(db.products)
})

app.post('/api/products', express.json(), async (req, res) => {
  await randomDelay()

  const { name, price } = req.body as { name?: unknown; price?: unknown }
  if (typeof name !== 'string' || !name.trim() || typeof price !== 'number' || !Number.isFinite(price)) {
    res.status(400).json({ error: 'Expected { name: string, price: number }' })
    return
  }

  const nextId = db.products.reduce((max, product) => Math.max(max, product.id), 0) + 1
  const product: ProductDto = { id: nextId, name: name.trim(), price }
  db.products.push(product)
  res.status(201).json(product)
})

app.delete('/api/products/:id', async (req, res) => {
  await randomDelay()

  const id = Number(req.params.id)
  const index = db.products.findIndex((product) => product.id === id)
  if (index === -1) {
    res.status(404).json({ error: 'Product not found' })
    return
  }

  db.products.splice(index, 1)
  res.status(204).end()
})

// In-memory store of drafts received via each HTTP backend - lets the page
// show, after a reload, which save requests actually survived the page death.
const receivedDrafts: Record<string, { text: string; receivedAt: string }> = {}

app.post('/api/draft', express.json(), (req, res) => {
  const { backend, text } = req.body as { backend?: string; text?: string }
  if (!backend || typeof text !== 'string') {
    res.status(400).json({ error: 'Expected { backend, text }' })
    return
  }

  receivedDrafts[backend] = { text, receivedAt: new Date().toISOString() }
  res.json(receivedDrafts[backend])
})

app.get('/api/draft', (_req, res) => {
  res.json(receivedDrafts)
})

app.delete('/api/draft', (_req, res) => {
  for (const key of Object.keys(receivedDrafts)) delete receivedDrafts[key]
  res.json({})
})

app.post('/api/uploads', async (req, res) => {
  let receivedBytes = 0

  // Consume the request stream slowly: TCP backpressure throttles the client's
  // upload, so XHR upload-progress events are visible even on localhost.
  for await (const chunk of req) {
    receivedBytes += (chunk as Buffer).length
    await new Promise((resolve) => setTimeout(resolve, 15))
  }

  res.json({ receivedBytes })
})

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
