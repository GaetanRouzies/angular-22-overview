import { ChangeDetectionStrategy, Component } from '@angular/core'
import { EagerCounter } from './eager-counter/eager-counter'
import { BrokenCounter } from './broken-counter/broken-counter'
import { SignalCounter } from './signal-counter/signal-counter'

@Component({
  selector: 'app-onpush-default',
  imports: [EagerCounter, BrokenCounter, SignalCounter],
  templateUrl: './onpush-default.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class OnPushDefault {

}
