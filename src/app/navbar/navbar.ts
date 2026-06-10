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
  templateUrl: './navbar.html',
})
export class Navbar {
  private router = inject(Router)

  examples: Example[] = [
    { path: 'onpush-default', title: '1. OnPush by Default' },
    { path: 'service-decorator', title: '2. @Service Decorator' },
    { path: 'inject-async', title: '3. injectAsync' },
    { path: 'http-fetch', title: '4. HTTP Fetch' },
    { path: 'template-improvements', title: '5. Template Improvements' },
    { path: 'quick-news', title: '6. Quick News' },
    { path: 'debounced-signal', title: '7. Debounced Signals' },
    { path: 'resources', title: '8. resource & httpResource' },
    { path: 'webmcp-ai', title: '9. WebMCP & AI' },
    { path: 'signal-forms', title: '10. Signal Forms' },
  ]

  currentPath = signal<string>('')

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const path = event.urlAfterRedirects.replace('/', '') || 'onpush-default'
        this.currentPath.set(path)
      })

    const initialPath = this.router.url.replace('/', '') || 'onpush-default'
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
