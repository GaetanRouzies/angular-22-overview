import { Component, computed, signal } from '@angular/core'
import { CommonModule } from '@angular/common'

interface Product {
  name: string
  category: 'Coffee' | 'Tea' | 'Pastry'
  price: number
}

type SortBy = 'name' | 'price'
type ViewMode = 'grid' | 'list'
type CategoryFilter = 'All' | Product['category']

@Component({
  selector: 'app-angular-aria',
  imports: [CommonModule],
  templateUrl: './angular-aria.html',
})
export class AngularAria {
  readonly categories: CategoryFilter[] = ['All', 'Coffee', 'Tea', 'Pastry']

  sortBy = signal<SortBy>('name')
  viewMode = signal<ViewMode>('grid')
  category = signal<CategoryFilter>('All')

  private catalog: Product[] = [
    { name: 'Espresso', category: 'Coffee', price: 2.5 },
    { name: 'Cappuccino', category: 'Coffee', price: 3.5 },
    { name: 'Earl Grey', category: 'Tea', price: 3.0 },
    { name: 'Croissant', category: 'Pastry', price: 2.0 },
  ]

  filtered = computed(() => {
    const cat = this.category()
    const list = cat === 'All' ? this.catalog : this.catalog.filter((p) => p.category === cat)
    return [...list].sort((a, b) =>
      this.sortBy() === 'name' ? a.name.localeCompare(b.name) : a.price - b.price,
    )
  })
}
