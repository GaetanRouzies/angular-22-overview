import { Component, signal } from '@angular/core'

class GiftCard {
  constructor(readonly balance: number) {}
}

interface CartItem {
  name: string
  quantity: number
  unitPrice: number
}

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered'

@Component({
  selector: 'app-template-improvements',
  templateUrl: './template-improvements.html',
})
export class TemplateImprovements {
  protected readonly GiftCard = GiftCard

  cartItems = signal<CartItem[]>([
    { name: 'Espresso', quantity: 2, unitPrice: 2.5 },
    { name: 'Cappuccino', quantity: 1, unitPrice: 3.5 },
    { name: 'Croissant', quantity: 3, unitPrice: 2.0 },
  ])
  coffees = signal(['Espresso', 'Cappuccino'])
  teas = signal(['Green tea', 'Chai'])
  orderStatus = signal<OrderStatus>('Processing')
  payment = signal<string | GiftCard>('cash')
  counter = signal(0)

  totalItems(): number {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  }

  payWithGiftCard() {
    this.payment.set(new GiftCard(25))
  }
}
