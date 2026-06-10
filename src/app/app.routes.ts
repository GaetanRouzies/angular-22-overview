import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'onpush-default',
    loadComponent: () => import('./1-onpush-default/onpush-default').then((m) => m.OnPushDefault),
  },
  {
    path: 'service-decorator',
    loadComponent: () =>
      import('./2-service-decorator/service-decorator').then((m) => m.ServiceDecorator),
  },
  {
    path: 'inject-async',
    loadComponent: () => import('./3-inject-async/inject-async').then((m) => m.InjectAsync),
  },
  {
    path: 'http-fetch',
    loadComponent: () => import('./4-http-fetch/http-fetch').then((m) => m.HttpFetch),
  },
  {
    path: 'template-improvements',
    loadComponent: () =>
      import('./5-template-improvements/template-improvements').then(
        (m) => m.TemplateImprovements,
      ),
  },
  {
    path: 'quick-news',
    loadComponent: () => import('./6-quick-news/quick-news').then((m) => m.QuickNews),
  },
  {
    path: 'debounced-signal',
    loadComponent: () =>
      import('./7-debounced-signal/debounced-signal').then((m) => m.DebouncedSignal),
  },
  {
    path: 'resources',
    loadComponent: () => import('./8-resources/resources').then((m) => m.Resources),
  },
  {
    path: 'webmcp-ai',
    loadComponent: () => import('./9-webmcp-ai/webmcp-ai').then((m) => m.WebmcpAi),
  },
  {
    path: 'signal-forms',
    loadComponent: () => import('./10-signal-forms/signal-forms').then((m) => m.SignalForms),
  },
  { path: '', redirectTo: '/onpush-default', pathMatch: 'full' },
]
