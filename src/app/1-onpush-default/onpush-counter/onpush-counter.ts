import { Component, OnInit, signal } from '@angular/core'

@Component({
  selector: 'app-onpush-counter',
  templateUrl: './onpush-counter.html',
})
export class OnPushCounter implements OnInit {
  pendingOrders = signal(0)

  ngOnInit() {
    setInterval(() => {
      this.pendingOrders.update((n) => n + 1)
    }, 1500)
  }
}
