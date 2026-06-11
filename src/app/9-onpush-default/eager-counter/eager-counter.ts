import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-eager-counter',
  templateUrl: './eager-counter.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class EagerCounter implements OnInit {
  counter = 0

  ngOnInit() {
    setInterval(() => this.counter++, 1500)
  }
}
