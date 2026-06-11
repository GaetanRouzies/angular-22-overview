import { HttpClient, HttpEvent } from '@angular/common/http'
import { inject, Service } from '@angular/core'
import { Observable } from 'rxjs'

export interface Order {
  id: string
  total: number
}

export interface Draft {
  backend: string
  text: string
  receivedAt: string
}

@Service()
export class OrderFetchService {
  private readonly http = inject(HttpClient)
  readonly baseUrl = 'http://localhost:3001/api'

  getCustomerOrders(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/customers/${customerId}/orders`)
  }

  uploadPayload(payload: Blob): Observable<HttpEvent<unknown>> {
    return this.http.post(`${this.baseUrl}/uploads`, payload, {
      observe: 'events',
    })
  }

  saveDraft(text: string): Observable<Draft> {
    return this.http.post<Draft>(`${this.baseUrl}/draft`,
      { backend: 'fetch-keepalive', text },
      { keepalive: true },
    )
  }

  // General gets

  getReceivedDrafts(): Observable<Draft[]> {
    return this.http.get<Draft[]>(`${this.baseUrl}/draft`)
  }

  clearDrafts(): Observable<Draft[]> {
    return this.http.delete<Draft[]>(`${this.baseUrl}/draft`)
  }
}
