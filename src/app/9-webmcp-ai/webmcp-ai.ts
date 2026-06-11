import { Component, declareExperimentalWebMcpTool, signal } from '@angular/core'
import { FormField, FormRoot, email, form, required } from '@angular/forms/signals'
import { VersionTag } from '../shared/version-tag'

@Component({
  selector: 'app-webmcp-ai',
  imports: [FormField, FormRoot, VersionTag],
  templateUrl: './webmcp-ai.html',
})
export class WebmcpAi {
  readonly modelContextDetected = 'modelContext' in navigator

  products = signal<{ name: string; price: number }[]>([
    { name: 'Espresso', price: 2.5 },
    { name: 'Croissant', price: 1.8 },
  ])

  userModel = signal({ username: '', email: '' })
  registeredUsers = signal<{ username: string; email: string }[]>([])

  registerForm = form(
    this.userModel,
    (schema) => {
      required(schema.username)
      required(schema.email)
      email(schema.email)
    },
    {
      experimentalWebMcpTool: {
        name: 'register_user',
        description: 'Register a new user with a username and an email address',
      },
      submission: {
        action: async () => {
          this.registeredUsers.update((users) => [...users, { ...this.userModel() }])
          this.userModel.set({ username: '', email: '' })
          return undefined
        },
      },
    },
  )

  constructor() {
    declareExperimentalWebMcpTool({
      name: 'add_product',
      description: 'Add a product with a name and a price to the product list',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          price: { type: 'number' },
        },
        required: ['name', 'price'],
        additionalProperties: false,
      },
      execute: (args) => {
        if (typeof args.name !== 'string' || typeof args.price !== 'number') {
          return 'Error: "name" must be a string and "price" a number'
        }
        this.products.update((products) => [...products, { name: args.name, price: args.price }])
        return `Added ${args.name} at ${args.price} €`
      },
    })
  }
}
