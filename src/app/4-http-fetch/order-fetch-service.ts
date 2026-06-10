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
  // The root HttpClient - backed by `fetch` in Angular 22.
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

  // `keepalive` is a fetch-only option: the request outlives the page, so a
  // save fired on `pagehide` still reaches the server. The XHR backend has no
  // equivalent - the browser kills its in-flight requests on unload.
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
