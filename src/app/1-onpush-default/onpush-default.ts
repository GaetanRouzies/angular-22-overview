import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EagerCounter } from './eager-counter/eager-counter'
import { BrokenCounter } from './broken-counter/broken-counter'
import { OnPushCounter } from './onpush-counter/onpush-counter'

@Component({
  selector: 'app-onpush-default',
  imports: [CommonModule, EagerCounter, BrokenCounter, OnPushCounter],
  templateUrl: './onpush-default.html',
})
export class OnPushDefault {

  sayHello() {
    console.log('hello')
  }
}
