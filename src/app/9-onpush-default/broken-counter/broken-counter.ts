import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-broken-counter',
  templateUrl: './broken-counter.html',
})
export class BrokenCounter implements OnInit {
  counter = 0

  ngOnInit() {
    setInterval(() => this.counter++, 1500)
  }
}
