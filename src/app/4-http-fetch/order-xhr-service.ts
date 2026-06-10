import { HttpClient, HttpEvent, HttpXhrBackend } from '@angular/common/http'
import { Service } from '@angular/core'
import { Observable } from 'rxjs'
import { Order } from './order-fetch-service'

@Service()
export class OrderXhrService {
  // A private HttpClient wired straight to the XHR backend - no extra
  // providers needed. Caveat: it bypasses app-level interceptors.
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

  // Same save, no keepalive possible: if the page dies before the response,
  // the browser aborts this request and the server never sees the draft.
  saveDraft(text: string): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/draft`, { backend: 'xhr', text })
  }
}
