import { Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormField, form, min, minLength, required } from '@angular/forms/signals'
import { SignalFormControl } from '@angular/forms/signals/compat'

interface Product {
  name: string
  price: number
  category: string
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
    price: 0,
    category: '',
  })

  productForm = form(this.productModel, (schema) => {
    required(schema.name, { message: 'Name is required' })
    minLength(schema.name, 3, { message: 'Name must be at least 3 characters' })
    required(schema.category, { message: 'Category is required' })
    required(schema.price, { message: 'Price is required' })
    min(schema.price, 0.01, { message: 'Price must be greater than 0' })
  })

  onSubmit() {
    if (this.productForm().valid()) {
      console.log('Product created:', this.productForm().value())
    }
  }

  // A FormControl backed by Signal Forms rules, usable inside a classic FormGroup
  userForm = new FormGroup({
    firstName: new SignalFormControl('', (firstName) => {
      required(firstName)
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  })

  onUserSubmit() {
    if (this.userForm.valid) {
      console.log('User saved:', this.userForm.getRawValue())
    }
  }
}
