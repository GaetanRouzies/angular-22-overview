import { Component } from '@angular/core'
import { EagerCounter } from './eager-counter/eager-counter'
import { BrokenCounter } from './broken-counter/broken-counter'
import { OnPushCounter } from './onpush-counter/onpush-counter'

@Component({
  selector: 'app-onpush-default',
  imports: [EagerCounter, BrokenCounter, OnPushCounter],
  templateUrl: './onpush-default.html',
})
export class OnPushDefault {
  sayHello() {
    console.log('hello')
  }
}
