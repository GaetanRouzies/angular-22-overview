import { HttpClient } from '@angular/common/http'
import { Service, inject } from '@angular/core'
import { Observable } from 'rxjs'

export interface Product {
  id: number
  name: string
  price: number
}

@Service()
export class ProductService {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = 'http://localhost:3001/api/products'

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  createProduct(name: string, price: number): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, { name, price })
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }
}
