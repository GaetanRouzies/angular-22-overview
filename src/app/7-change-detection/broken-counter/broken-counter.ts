import { Component, OnDestroy, OnInit } from '@angular/core'

// Same logic as `EagerCounter`, but no strategy declared.
// In Angular 22 the default is `OnPush`, so the template never re-renders.
@Component({
  selector: 'app-broken-counter',
  templateUrl: './broken-counter.html',
})
export class BrokenCounter implements OnInit, OnDestroy {
  pendingOrders = 0
  private timer?: ReturnType<typeof setInterval>

  ngOnInit() {
    this.timer = setInterval(() => {
      this.pendingOrders++
    }, 1500)
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer)
  }
}
