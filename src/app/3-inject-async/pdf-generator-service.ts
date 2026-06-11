import { Service } from '@angular/core'
import type { Product } from './product.model'

// Pretend this ships with a heavy PDF rendering library.
@Service()
export class PdfGeneratorService {
  generateInvoice(products: readonly Product[]): string {
    const generatedAt = new Date().toISOString()
    const reference = `INV-${Date.now().toString(36).toUpperCase()}`
    const total = products.reduce((sum, product) => sum + product.price, 0)

    const lines = products.map((product) => {
      const id = product.id.toString().padStart(3, '0')
      const name = product.name.padEnd(20, ' ')
      const price = product.price.toFixed(2)
      return `  ${id}  ${name}  ${price} €`
    })

    return [
      '═══════════════════════════════════════',
      `  INVOICE ${reference}`,
      `  Generated at ${generatedAt}`,
      '═══════════════════════════════════════',
      ...lines,
      '───────────────────────────────────────',
      `  TOTAL: ${total.toFixed(2)} €`,
      '═══════════════════════════════════════',
    ].join('\n')
  }

  generateReceipt(productName: string, price: number): string {
    return `[receipt] ${productName} - ${price.toFixed(2)} €`
  }
}
