import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EagerCounter } from './eager-counter/eager-counter'
import { BrokenCounter } from './broken-counter/broken-counter'
import { OnPushCounter } from './onpush-counter/onpush-counter'

@Component({
  selector: 'app-change-detection',
  imports: [CommonModule, EagerCounter, BrokenCounter, OnPushCounter],
  templateUrl: './change-detection.html',
})
export class ChangeDetection {}
