import { Component, computed, inject, signal } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { CommonModule } from '@angular/common'
import { filter } from 'rxjs'

interface Example {
  path: string
  title: string
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  private router = inject(Router)

  examples: Example[] = [
    { path: 'signal-forms', title: '1. Signal Forms' },
    { path: 'resource', title: '2. resource & httpResource' },
    { path: 'ai-features', title: '3. AI Features' },
    { path: 'service-inject-async', title: '4. @Service & injectAsync' },
    { path: 'angular-aria', title: '5. Angular ARIA' },
    { path: 'typescript-6', title: '6. TypeScript 6' },
    { path: 'change-detection', title: '7. Change Detection' },
    { path: 'templates', title: '8. Template Improvements' },
    { path: 'signal-debounced', title: '9. Debounced Signals' },
  ]

  currentPath = signal<string>('')

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const path = event.urlAfterRedirects.replace('/', '') || 'signal-forms'
        this.currentPath.set(path)
      })

    const initialPath = this.router.url.replace('/', '') || 'signal-forms'
    this.currentPath.set(initialPath)
  }

  currentExample = computed(() => {
    return this.examples.find((ex) => ex.path === this.currentPath()) || this.examples[0]
  })

  currentIndex = computed(() => {
    return this.examples.findIndex((ex) => ex.path === this.currentPath())
  })

  previousExample = computed(() => {
    const index = this.currentIndex()
    return index > 0 ? this.examples[index - 1] : null
  })

  nextExample = computed(() => {
    const index = this.currentIndex()
    return index < this.examples.length - 1 ? this.examples[index + 1] : null
  })

  navigateTo(example: Example) {
    this.router.navigate([`/${example.path}`])
  }
}
