import { Component, inject, injectAsync, onIdle, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductService } from './product-service'

@Component({
  selector: 'app-service-inject-async',
  imports: [CommonModule],
  templateUrl: './service-inject-async.html',
})
export class ServiceInjectAsync {
  // Plain `@Service()` consumed with regular `inject()`.
  private products = inject(ProductService)
  catalog = this.products.products

  // `injectAsync` returns a function. Calling it loads the module the
  // first time, then resolves to the service instance. The `prefetch: onIdle`
  // option warms it up during browser idle time.
  private pdfGenerator = injectAsync(
    () => import('./pdf-generator-service').then((m) => m.PdfGeneratorService),
    { prefetch: onIdle },
  )

  lastInvoice = signal<string>('')

  addProduct() {
    const next = this.catalog().length + 1
    const price = Number((Math.random() * 5 + 1).toFixed(2))
    this.products.add(`New product #${next}`, price)
  }

  removeProduct(id: number) {
    this.products.remove(id)
  }

  async generateInvoice() {
    const generator = await this.pdfGenerator()
    this.lastInvoice.set(generator.generateInvoice(this.catalog()))
  }
}
