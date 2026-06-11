import { Component, OnInit, signal } from '@angular/core'

@Component({
  selector: 'app-signal-counter',
  templateUrl: './signal-counter.html',
})
export class SignalCounter implements OnInit {
  counter = signal(0)

  ngOnInit() {
    setInterval(() => this.counter.update((count) => count + 1), 1500)
  }
}
