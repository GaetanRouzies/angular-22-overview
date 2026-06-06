import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors())

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

interface Database {
  customers: Record<string, Customer>
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

app.listen(PORT, () => {
  console.log(`Orders API running on http://localhost:${PORT}`)
})
