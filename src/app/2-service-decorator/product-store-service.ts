import { Service, signal } from '@angular/core'

export interface Product {
  id: number
  name: string
  price: number
}

@Service()
export class ProductStoreService {
  private readonly catalog = signal<Product[]>([
    { id: 1, name: 'Espresso', price: 2.5 },
    { id: 2, name: 'Cappuccino', price: 3.5 },
    { id: 3, name: 'Croissant', price: 2.0 },
  ])

  products = this.catalog.asReadonly()

  add(name: string, price: number): void {
    const nextId = (this.catalog().at(-1)?.id ?? 0) + 1
    this.catalog.update((current) => [...current, { id: nextId, name, price }])
  }

  remove(id: number): void {
    this.catalog.update((current) => current.filter((product) => product.id !== id))
  }
}
