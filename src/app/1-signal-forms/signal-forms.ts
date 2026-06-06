import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormField, form, min, minLength, required } from '@angular/forms/signals'

interface NewProduct {
  name: string
  sku: string
  price: number
  category: string
  inStock: boolean
}

@Component({
  selector: 'app-signal-forms',
  imports: [CommonModule, FormField],
  templateUrl: './signal-forms.html',
})
export class SignalForms {
  readonly categories = ['Coffee', 'Tea', 'Pastry', 'Other']

  productModel = signal<NewProduct>({
    name: '',
    sku: '',
    price: 0,
    category: '',
    inStock: true,
  })

  productForm = form(this.productModel, (schema) => {
    required(schema.name, { message: 'Name is required' })
    minLength(schema.name, 3, { message: 'Name must be at least 3 characters' })
    required(schema.sku, { message: 'SKU is required' })
    required(schema.category, { message: 'Category is required' })
    min(schema.price, 0.01, { message: 'Price must be greater than 0' })
  })

  onSubmit() {
    if (this.productForm().valid()) {
      console.log('Product created:', this.productForm().value())
    }
  }
}
