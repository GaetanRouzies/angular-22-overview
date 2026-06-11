import { Component, computed, debounced, resource, signal } from '@angular/core'

interface SearchResult {
  id: number
  name: string
}

@Component({
  selector: 'app-debounced-signal',
  templateUrl: './debounced-signal.html',
})
export class DebouncedSignal {
  query = signal('')

  debouncedQuery = debounced(this.query, 400)

  keystrokes = signal(0)

  results = resource({
    params: () => this.debouncedQuery.value(),
    loader: ({ params }) => this.search(params),
  })

  resultCount = computed(() => (this.results.hasValue() ? this.results.value().length : 0))

  onInput(value: string) {
    this.keystrokes.update((n) => n + 1)
    this.query.set(value)
  }

  private async search(term: string): Promise<SearchResult[]> {
    const trimmed = term.trim()
    if (!trimmed) return []

    // Simulate a network round-trip.
    await new Promise((resolve) => setTimeout(resolve, 300))

    const fruits = [
      'Apple',
      'Apricot',
      'Banana',
      'Blackberry',
      'Blueberry',
      'Cherry',
      'Grape',
      'Mango',
      'Orange',
      'Peach',
      'Pear',
      'Pineapple',
      'Raspberry',
      'Strawberry',
    ]

    return fruits
      .filter((name) => name.toLowerCase().includes(trimmed.toLowerCase()))
      .map((name, id) => ({ id, name }))
  }
}
