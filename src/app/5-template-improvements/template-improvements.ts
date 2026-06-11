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

  coffees = signal(['Espresso', 'Cappuccino'])
  teas = signal(['Green tea', 'Chai'])
  orderStatus = signal<OrderStatus>('Processing')
  payment = signal<string | GiftCard>('cash')
  counter = signal(0)

  payWithGiftCard() {
    this.payment.set(new GiftCard(25))
  }
}
