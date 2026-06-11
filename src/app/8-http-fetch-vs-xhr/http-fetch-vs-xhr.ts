import { Component, computed, inject, signal } from '@angular/core'
import { HttpEventType } from '@angular/common/http'
import { Draft, Order, OrderFetchService } from './order-fetch-service'
import { OrderXhrService } from './order-xhr-service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-http-fetch-vs-xhr',
  templateUrl: './http-fetch-vs-xhr.html',
  host: { '(window:pagehide)': 'saveDraftOnExit()' },
  imports: [FormsModule],
})
export class HttpFetchVsXhr {
  private orderFetchService = inject(OrderFetchService)
  private orderXhrService = inject(OrderXhrService)

  fetchOrders = signal<Order[] | null>(null)
  xhrOrders = signal<Order[] | null>(null)

  fetchUploadProgress = signal<number | null>(null)
  xhrUploadProgress = signal<number | null>(null)

  draft = signal('')
  receivedDrafts = signal<Draft[]>([])
  fetchDraft = computed(() =>
    this.receivedDrafts().find((draft) => draft.backend === 'fetch-keepalive'),
  )
  xhrDraft = computed(() => this.receivedDrafts().find((draft) => draft.backend === 'xhr'))

  constructor() {
    this.refreshDrafts()
  }

  loadWithFetch() {
    this.orderFetchService.getCustomerOrders(1).subscribe((orders) => this.fetchOrders.set(orders))
  }

  loadWithXhr() {
    this.orderXhrService.getCustomerOrders(1).subscribe((orders) => this.xhrOrders.set(orders))
  }

  uploadWithFetch() {
    const payload = new Blob([new Uint8Array(5 * 1024 * 1024)])
    this.fetchUploadProgress.set(0)

    this.orderFetchService.uploadPayload(payload).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        this.fetchUploadProgress.set(Math.round((100 * event.loaded) / event.total))
      } else if (event.type === HttpEventType.Response) {
        this.fetchUploadProgress.set(100)
      }
    })
  }

  uploadWithXhr() {
    const payload = new Blob([new Uint8Array(5 * 1024 * 1024)])
    this.xhrUploadProgress.set(0)

    this.orderXhrService.uploadPayload(payload).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        this.xhrUploadProgress.set(Math.round((100 * event.loaded) / event.total))
      } else if (event.type === HttpEventType.Response) {
        this.xhrUploadProgress.set(100)
      }
    })
  }

  // Keep alive

  saveDraftOnExit() {
    const text = this.draft().trim()
    if (!text) return

    this.orderFetchService.saveDraft(text).subscribe()
    this.orderXhrService.saveDraft(text).subscribe()
  }

  refreshDrafts() {
    this.orderFetchService
      .getReceivedDrafts()
      .subscribe((drafts) => this.receivedDrafts.set(drafts))
  }

  clearDrafts() {
    this.orderFetchService.clearDrafts().subscribe(() => this.receivedDrafts.set([]))
  }
}
