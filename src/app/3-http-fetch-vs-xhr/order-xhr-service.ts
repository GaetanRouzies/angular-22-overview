import { HttpClient, HttpEvent, HttpRequest, HttpXhrBackend } from '@angular/common/http'
import { inject, InjectionToken, Service } from '@angular/core'
import { Observable } from 'rxjs'
import { Draft, Order } from './order-fetch-service'

// HttpClient with XHR backend
export const XHR_HTTP_CLIENT = new InjectionToken<HttpClient>('XHR_HTTP_CLIENT', {
  providedIn: 'root',
  factory: () => new HttpClient(inject(HttpXhrBackend)),
})

@Service()
export class OrderXhrService {
  private readonly httpXhrClient = inject(XHR_HTTP_CLIENT)
  readonly baseUrl = 'http://localhost:3001/api'

  getCustomerOrders(customerId: number): Observable<Order[]> {
    return this.httpXhrClient.get<Order[]>(`${this.baseUrl}/customers/${customerId}/orders`)
  }

  uploadPayload(payload: Blob): Observable<HttpEvent<unknown>> {
    return this.httpXhrClient.request(
      new HttpRequest('POST', `${this.baseUrl}/uploads`, payload, { reportUploadProgress: true }),
    )
  }

  saveDraft(text: string): Observable<Draft> {
    return this.httpXhrClient.post<Draft>(`${this.baseUrl}/draft`,
      { backend: 'xhr', text }
    )
  }
}
