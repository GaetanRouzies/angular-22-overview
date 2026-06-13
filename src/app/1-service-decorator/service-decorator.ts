import { Component, inject } from '@angular/core'
import { ProductService } from './product-service'
import { rxResource } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-service-decorator',
  templateUrl: './service-decorator.html',
})
export class ServiceDecorator {
  productService = inject(ProductService)

  products = rxResource({
    stream: () => this.productService.getProducts(),
  })

  addProduct() {
    const next = (this.products.value()?.length ?? 0) + 1
    const price = Number((Math.random() * 5 + 1).toFixed(2))
    this.productService
      .createProduct(`New product #${next}`, price)
      .subscribe(() => this.products.reload())
  }

  removeProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.products.reload())
  }
}
