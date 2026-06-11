import { Component, signal } from '@angular/core'

class GiftCard {
  constructor(readonly balance: number) {}
}

interface CartItem {
  name: string
  quantity: number
  unitPrice: number
  outOfStock: boolean
}

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered'

@Component({
  selector: 'app-template-improvements',
  templateUrl: './template-improvements.html',
})
export class TemplateImprovements {
  protected readonly GiftCard = GiftCard

  readonly baseItemClasses = { flex: true, 'justify-between': true, 'p-2': true }

  cart = signal<CartItem[]>([
    { name: 'Espresso', quantity: 2, unitPrice: 2.5, outOfStock: false },
    { name: 'Cappuccino', quantity: 1, unitPrice: 3.5, outOfStock: false },
    { name: 'Croissant', quantity: 3, unitPrice: 2.0, outOfStock: true },
  ])
  featured = signal<CartItem>({
    name: 'Espresso',
    quantity: 2,
    unitPrice: 2.5,
    outOfStock: false,
  })
  orderStatus = signal<OrderStatus>('Processing')
  payment = signal<string | GiftCard>('cash')

  totalItems(): number {
    return this.cart().reduce((sum, item) => sum + item.quantity, 0)
  }

  lineTotal(item: CartItem): number {
    return item.unitPrice * item.quantity
  }

  cartTotal(...items: CartItem[]): number {
    return items.reduce((sum, item) => sum + this.lineTotal(item), 0)
  }

  setStatus(status: OrderStatus) {
    this.orderStatus.set(status)
  }

  payWithGiftCard() {
    this.payment.set(new GiftCard(25))
  }
}
