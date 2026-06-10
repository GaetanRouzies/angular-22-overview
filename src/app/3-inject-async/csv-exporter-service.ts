import { Service } from '@angular/core'
import type { Product } from '../2-service-decorator/product-store-service'

// Like PdfGeneratorService, pretend this ships with a heavy serialization library.
// Here `injectAsync` pulls it in WITHOUT `prefetch`, so the module is only fetched
// on the very first call - not warmed up during idle time. See `inject-async.ts`.
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
