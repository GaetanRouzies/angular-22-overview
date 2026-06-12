import { Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormField, form, min, minLength, required, FormRoot } from '@angular/forms/signals'
import { SignalFormControl } from '@angular/forms/signals/compat'

interface Product {
  name: string
  price: number
  category: string
}

@Component({
  selector: 'app-signal-forms',
  imports: [FormField, ReactiveFormsModule, JsonPipe, FormRoot],
  templateUrl: './signal-forms.html',
})
export class SignalForms {
  categories = ['Coffee', 'Tea', 'Pastry', 'Other']

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

  saveProduct() {
    // ...
  }




  

  constructor() {
    const formFieldTree = this.productForm
    const formFieldState = this.productForm()

    const nameFieldTree = this.productForm.name
    const nameFieldState = this.productForm.name().valid()
  }









  // SignalFormControl

  userForm = new FormGroup({
    firstName: new SignalFormControl('', (firstName) => {
      required(firstName)
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  })

  saveUser() {
    // ...
  }
}
