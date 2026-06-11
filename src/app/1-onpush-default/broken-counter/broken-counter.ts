import { Component, OnInit } from '@angular/core'

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
