import { Component, computed, inject, signal, WritableSignal } from '@angular/core'
import { HttpEvent, HttpEventType } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { Order, OrderFetchService, ReceivedDrafts } from './order-fetch-service'
import { OrderXhrService } from './order-xhr-service'

@Component({
  selector: 'app-http-fetch',
  templateUrl: './http-fetch.html',
  host: { '(window:pagehide)': 'saveDraftOnExit()' },
})
export class HttpFetch {
  private orderFetchService = inject(OrderFetchService)
  private orderXhrService = inject(OrderXhrService)

  fetchOrders = signal<Order[] | null>(null)
  xhrOrders = signal<Order[] | null>(null)

  fetchUploadProgress = signal<number | null>(null)
  xhrUploadProgress = signal<number | null>(null)

  draft = signal('')
  receivedDrafts = signal<ReceivedDrafts>({})
  fetchDraft = computed(() => this.receivedDrafts()['fetch-keepalive'] ?? null)
  xhrDraft = computed(() => this.receivedDrafts()['xhr'] ?? null)

  constructor() {
    this.refreshDrafts()
  }

  async loadWithFetch() {
    this.fetchOrders.set(await firstValueFrom(this.orderFetchService.getRecentOrders(1)))
  }

  async loadWithXhr() {
    this.xhrOrders.set(await firstValueFrom(this.orderXhrService.getRecentOrders(1)))
  }

  uploadWithFetch() {
    this.trackUpload(this.orderFetchService, this.fetchUploadProgress)
  }

  uploadWithXhr() {
    this.trackUpload(this.orderXhrService, this.xhrUploadProgress)
  }

  saveDraftOnExit() {
    const text = this.draft().trim()
    if (!text) return

    this.orderFetchService.saveDraft(text).subscribe()
    this.orderXhrService.saveDraft(text).subscribe()
  }

  async refreshDrafts() {
    this.receivedDrafts.set(await firstValueFrom(this.orderFetchService.getReceivedDrafts()))
  }

  async clearDrafts() {
    await firstValueFrom(this.orderFetchService.clearDrafts())
    this.receivedDrafts.set({})
  }

  private trackUpload(
    service: OrderFetchService | OrderXhrService,
    progress: WritableSignal<number | null>,
  ) {
    const payload = new Blob([new Uint8Array(5 * 1024 * 1024)])
    progress.set(0)

    service.uploadPayload(payload).subscribe((event: HttpEvent<unknown>) => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        progress.set(Math.round((100 * event.loaded) / event.total))
      } else if (event.type === HttpEventType.Response) {
        progress.set(100)
      }
    })
  }
}
