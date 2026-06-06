import { Component, computed, debounced, resource, signal } from '@angular/core'
import { CommonModule } from '@angular/common'

interface SearchResult {
  id: number
  name: string
}

@Component({
  selector: 'app-signal-debounced',
  imports: [CommonModule],
  templateUrl: './signal-debounced.html',
})
export class SignalDebounced {
  // The raw signal updates on every keystroke.
  query = signal('')

  // `debounced` returns a Resource whose value only updates once the source
  // signal stops changing for the given wait (here: 400ms).
  debouncedQuery = debounced(this.query, 400)

  // Number of characters typed vs. number of "settled" searches - makes the
  // debounce visible: the raw counter races ahead while the debounced one lags.
  keystrokes = signal(0)

  // A resource keyed on the *debounced* value, so we only hit the loader once
  // the user pauses typing instead of on every keystroke.
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
