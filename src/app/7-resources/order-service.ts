import { HttpClient } from '@angular/common/http'
import { inject, Service } from '@angular/core'
import { Observable } from 'rxjs'
import { Order } from './order.model'

@Service()
export class OrderService {
  private readonly http = inject(HttpClient)
  readonly baseUrl = 'http://localhost:3001/api'

  getCustomerOrders(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/customers/${customerId}/orders`)
  }
}
