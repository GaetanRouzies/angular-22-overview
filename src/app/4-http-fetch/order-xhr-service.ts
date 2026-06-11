import { HttpClient, HttpEvent, HttpXhrBackend } from '@angular/common/http'
import { Service } from '@angular/core'
import { Observable } from 'rxjs'
import { Order } from './order-fetch-service'

@Service()
export class OrderXhrService {
  private readonly http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }))
  readonly baseUrl = 'http://localhost:3001/api'

  getRecentOrders(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/customers/${customerId}/orders`)
  }

  uploadPayload(payload: Blob): Observable<HttpEvent<unknown>> {
    return this.http.post(`${this.baseUrl}/uploads`, payload, {
      reportProgress: true,
      observe: 'events',
    })
  }

  saveDraft(text: string): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/draft`, { backend: 'xhr', text })
  }
}
