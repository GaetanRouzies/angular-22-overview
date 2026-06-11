import { Component, inject, signal } from '@angular/core'
import { Product, ProductService } from './product-service'

@Component({
  selector: 'app-service-decorator',
  templateUrl: './service-decorator.html',
})
export class ServiceDecorator {
  private readonly productService = inject(ProductService)

  readonly products = signal<Product[]>([])

  constructor() {
    this.productService.getProducts().subscribe((products) => this.products.set(products))
  }

  addProduct() {
    const next = this.products().length + 1
    const price = Number((Math.random() * 5 + 1).toFixed(2))
    this.productService
      .createProduct(`New product #${next}`, price)
      .subscribe((created) => this.products.update((current) => [...current, created]))
  }

  removeProduct(id: number) {
    this.productService
      .deleteProduct(id)
      .subscribe(() => this.products.update((current) => current.filter((product) => product.id !== id)))
  }
}
