import { Component, debounced, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-debounced-signal',
  templateUrl: './debounced-signal.html',
  imports: [FormsModule],
})
export class DebouncedSignal {
  search = signal('')
  debouncedSearch = debounced(this.search, 1000)
}
