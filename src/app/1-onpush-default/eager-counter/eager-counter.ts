import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

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
