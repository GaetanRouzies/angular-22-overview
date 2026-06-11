import { HttpClient, HttpEvent } from '@angular/common/http'
import { inject, Service } from '@angular/core'
import { Observable } from 'rxjs'

export interface Order {
  id: string
  total: number
}

export type ReceivedDrafts = Record<string, { text: string; receivedAt: string }>

@Service()
export class OrderFetchService {
  private readonly http = inject(HttpClient)
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
    return this.http.post(
      `${this.baseUrl}/draft`,
      { backend: 'fetch-keepalive', text },
      { keepalive: true },
    )
  }

  getReceivedDrafts(): Observable<ReceivedDrafts> {
    return this.http.get<ReceivedDrafts>(`${this.baseUrl}/draft`)
  }

  clearDrafts(): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/draft`)
  }
}
