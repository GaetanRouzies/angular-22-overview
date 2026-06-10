import { Component, computed, inject, resource, signal } from '@angular/core'
import { httpResource } from '@angular/common/http'
import { rxResource } from '@angular/core/rxjs-interop'
import { CommonModule } from '@angular/common'
import { firstValueFrom } from 'rxjs'
import { Order, OrderFetchService } from '../4-http-fetch/order-fetch-service'

@Component({
  selector: 'app-resources',
  templateUrl: './resources.html',
})
export class Resources {
  orderService = inject(OrderFetchService)
  customerId = signal(1)

  // httpResource - declarative URL, returns the response as a signal.
  orders1 = httpResource<Order[]>(
    () => `${this.orderService.baseUrl}/customers/${this.customerId()}/orders`,
    { defaultValue: [] },
  )

  // rxResource - Observable-native loader, consumes OrderFetchService directly.
  orders2 = rxResource({
    params: () => ({ customerId: this.customerId() }),
    stream: ({ params }) => this.orderService.getRecentOrders(params.customerId),
    defaultValue: [],
  })

  // resource - generic Promise loader, bridges the Observable with firstValueFrom.
  orders3 = resource({
    params: () => ({ customerId: this.customerId() }),
    loader: ({ params }) => firstValueFrom(this.orderService.getRecentOrders(params.customerId)),
    defaultValue: [],
  })

  total1 = computed(() => this.sum(this.orders1.value()))
  total2 = computed(() => this.sum(this.orders2.value()))
  total3 = computed(() => this.sum(this.orders3.value()))

  private sum(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total, 0)
  }
}
