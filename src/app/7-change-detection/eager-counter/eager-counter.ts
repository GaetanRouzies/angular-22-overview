import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'

// Plain property mutation on a fresh order arriving every 1.5 s.
// Works only because we opt in to eager change detection - the new name
// for the former `ChangeDetectionStrategy.Default`.
@Component({
  selector: 'app-eager-counter',
  templateUrl: './eager-counter.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class EagerCounter implements OnInit, OnDestroy {
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
