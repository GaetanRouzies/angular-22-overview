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
    { path: 'service-decorator', title: '1. @Service Decorator' },
    { path: 'inject-async', title: '2. injectAsync' },
    { path: 'http-fetch', title: '3. HTTP Fetch' },
    { path: 'template-improvements', title: '4. Template Improvements' },
    { path: 'debounced-signal', title: '5. Debounced Signals' },
    { path: 'resources', title: '6. resource & httpResource' },
    { path: 'webmcp-ai', title: '7. WebMCP & AI' },
    { path: 'onpush-default', title: '8. OnPush by Default' },
    { path: 'signal-forms', title: '9. Signal Forms' },
  ]

  currentPath = signal<string>('')

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const path = event.urlAfterRedirects.replace('/', '') || 'service-decorator'
        this.currentPath.set(path)
      })

    const initialPath = this.router.url.replace('/', '') || 'service-decorator'
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
