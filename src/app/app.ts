import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Navbar } from './navbar/navbar'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  // Eager so Zone.js ticks can traverse down to the 9-onpush-default chapter
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class App {}
