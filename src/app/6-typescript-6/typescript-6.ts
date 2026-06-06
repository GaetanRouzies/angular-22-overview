import { Component, computed, signal } from '@angular/core'
import { CommonModule } from '@angular/common'

// --- 1. `satisfies` - type-checked against a shape, keeps narrow literal values.
type StatusStyle = { label: string; color: string }
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered'
const STATUS_PALETTE = {
  pending: { label: 'Pending', color: '#f59e0b' },
  processing: { label: 'Processing', color: '#3b82f6' },
  shipped: { label: 'Shipped', color: '#10b981' },
  delivered: { label: 'Delivered', color: '#6b7280' },
} satisfies Record<OrderStatus, StatusStyle>

// --- 2. `const` type parameters - preserve tuple literal types so the union
// of valid statuses is inferred automatically.
function statuses<const T extends readonly OrderStatus[]>(values: T): T {
  return values
}
const PIPELINE = statuses(['pending', 'processing', 'shipped', 'delivered'])

// --- 3. Narrowing through aliased conditions on discriminated unions.
type PaymentMethod =
  | { kind: 'card'; brand: 'visa' | 'mastercard'; last4: string }
  | { kind: 'paypal'; email: string }
  | { kind: 'wire'; iban: string }

function describePayment(p: PaymentMethod): string {
  const isCard = p.kind === 'card'
  // TS 6 narrows `p` to the card branch from the alias.
  if (isCard) {
    return `${p.brand.toUpperCase()} •••• ${p.last4}`
  }
  return p.kind === 'paypal' ? `PayPal (${p.email})` : `Wire ${p.iban}`
}

// --- 4. `Awaited<T>` infers the resolved type of async functions.
async function fetchCustomer(id: number) {
  return { id, name: 'Ada Lovelace', email: 'ada@example.com' }
}
type Customer = Awaited<ReturnType<typeof fetchCustomer>>

@Component({
  selector: 'app-typescript-6',
  imports: [CommonModule],
  templateUrl: './typescript-6.html',
})
export class TypeScript6 {
  readonly pipeline = PIPELINE
  readonly palette = STATUS_PALETTE

  currentStatus = signal<OrderStatus>('processing')

  payments: PaymentMethod[] = [
    { kind: 'card', brand: 'visa', last4: '4242' },
    { kind: 'paypal', email: 'ada@example.com' },
    { kind: 'wire', iban: 'FR76•••0123' },
  ]
  paymentLabels = this.payments.map(describePayment)

  customer = signal<Customer>({ id: 1, name: 'Ada Lovelace', email: 'ada@example.com' })
  greeting = computed(() => `Hello, ${this.customer().name}!`)

  setStatus(status: OrderStatus) {
    this.currentStatus.set(status)
  }
}
