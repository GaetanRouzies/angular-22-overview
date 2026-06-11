import { Component, computed, inject, signal } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs'

interface Example {
  path: string
  title: string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
})
export class Navbar {
  private router = inject(Router)

  examples: Example[] = [
    { path: 'signal-forms', title: '1. Signal Forms' },
    { path: 'service-decorator', title: '2. @Service Decorator' },
    { path: 'inject-async', title: '3. injectAsync' },
    { path: 'agent-skills', title: '4. Agent Skills' },
    { path: 'template-improvements', title: '5. Template Improvements' },
    { path: 'debounced-signal', title: '6. Debounced Signals' },
    { path: 'resources', title: '7. resource & httpResource' },
    { path: 'http-fetch-vs-xhr', title: '8. HTTP Fetch' },
    { path: 'onpush-default', title: '9. OnPush by Default' },
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
    return this.examples.find((example) => example.path === this.currentPath()) || this.examples[0]
  })

  currentIndex = computed(() => {
    return this.examples.findIndex((example) => example.path === this.currentPath())
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
