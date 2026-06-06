import { Component, OnDestroy, OnInit, signal } from '@angular/core'

// Same business behavior, but state lives in a signal.
// No strategy needed - the default OnPush picks up the signal read in the
// template and re-renders on every update.
@Component({
  selector: 'app-onpush-counter',
  templateUrl: './onpush-counter.html',
})
export class OnPushCounter implements OnInit, OnDestroy {
  pendingOrders = signal(0)
  private timer?: ReturnType<typeof setInterval>

  ngOnInit() {
    this.timer = setInterval(() => {
      this.pendingOrders.update((n) => n + 1)
    }, 1500)
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer)
  }
}
