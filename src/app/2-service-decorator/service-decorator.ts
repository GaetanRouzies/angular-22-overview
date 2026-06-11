import { Component, inject } from '@angular/core'
import { ProductStoreService } from './product-store-service'

@Component({
  selector: 'app-service-decorator',
  templateUrl: './service-decorator.html',
})
export class ServiceDecorator {
  productStoreService = inject(ProductStoreService)

  addProduct() {
    const next = this.productStoreService.products().length + 1
    const price = Number((Math.random() * 5 + 1).toFixed(2))
    this.productStoreService.add(`New product #${next}`, price)
  }

  removeProduct(id: number) {
    this.productStoreService.remove(id)
  }
}
