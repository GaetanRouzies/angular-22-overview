import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

// Plain property mutation on a fresh order arriving every 1.5 s.
// Works only because we opt in to eager change detection - the new name
// for the former `ChangeDetectionStrategy.Default`.
@Component({
  selector: 'app-eager-counter',
  templateUrl: './eager-counter.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class EagerCounter implements OnInit {
  pendingOrders = 0

  ngOnInit() {
    setInterval(() => {
      this.pendingOrders++
    }, 1500)
  }
}
