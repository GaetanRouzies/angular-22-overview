import { Component, OnInit } from '@angular/core'

// Same logic as `EagerCounter`, but no strategy declared.
// In Angular 22 the default is `OnPush`, so the template never re-renders.
@Component({
  selector: 'app-broken-counter',
  templateUrl: './broken-counter.html',
})
export class BrokenCounter implements OnInit {
  pendingOrders = 0

  ngOnInit() {
    setInterval(() => {
      this.pendingOrders++
    }, 1500)
  }
}
