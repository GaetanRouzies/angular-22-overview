import { Component, computed, inject, resource, signal } from '@angular/core'
import { httpResource } from '@angular/common/http'
import { rxResource } from '@angular/core/rxjs-interop'
import { firstValueFrom } from 'rxjs'
import { OrderService } from './order-service'
import { Order } from './order.model'

@Component({
  selector: 'app-resources',
  templateUrl: './resources.html',
})
export class Resources {
  orderService = inject(OrderService)
  customerId = signal(1)

  orders1 = httpResource<Order[]>(
    () => `${this.orderService.baseUrl}/customers/${this.customerId()}/orders`,
    { defaultValue: [] },
  )

  orders2 = rxResource({
    params: () => ({ customerId: this.customerId() }),
    stream: ({ params }) => this.orderService.getCustomerOrders(params.customerId),
    defaultValue: [],
  })

  orders3 = resource({
    params: () => ({ customerId: this.customerId() }),
    loader: ({ params }) => firstValueFrom(this.orderService.getCustomerOrders(params.customerId)),
    defaultValue: [],
  })

  total1 = computed(() => this.sum(this.orders1.value()))
  total2 = computed(() => this.sum(this.orders2.value()))
  total3 = computed(() => this.sum(this.orders3.value()))

  private sum(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total, 0)
  }
}
