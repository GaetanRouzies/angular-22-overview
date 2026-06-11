import { Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormField, form, min, minLength, required } from '@angular/forms/signals'
import { SignalFormControl } from '@angular/forms/signals/compat'

interface Product {
  name: string
  sku: string
  price: number
  category: string
  inStock: boolean
}

@Component({
  selector: 'app-signal-forms',
  imports: [FormField, ReactiveFormsModule, JsonPipe],
  templateUrl: './signal-forms.html',
})
export class SignalForms {
  readonly categories = ['Coffee', 'Tea', 'Pastry', 'Other']

  productModel = signal<Product>({
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

  // A FormControl backed by Signal Forms rules, usable inside a classic FormGroup
  supplierName = new SignalFormControl('', (name) => {
    required(name, { message: 'Supplier name is required' })
    minLength(name, 2, { message: 'At least 2 characters' })
  })

  supplierForm = new FormGroup({
    name: this.supplierName,
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  })

  onSupplierSubmit() {
    if (this.supplierForm.valid) {
      console.log('Supplier saved:', this.supplierForm.getRawValue())
    }
  }
}
