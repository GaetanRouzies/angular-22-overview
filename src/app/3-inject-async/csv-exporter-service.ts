import { Service } from '@angular/core'
import type { Product } from '../2-service-decorator/product-store-service'

// Pretend this ships with a heavy serialization library.
@Service()
export class CsvExporterService {
  toCsv(products: readonly Product[]): string {
    const header = 'id,name,price'
    const rows = products.map(
      (product) => `${product.id},"${product.name}",${product.price.toFixed(2)}`,
    )
    return [header, ...rows].join('\n')
  }
}
