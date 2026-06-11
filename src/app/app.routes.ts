import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'service-decorator',
    loadComponent: () =>
      import('./1-service-decorator/service-decorator').then((m) => m.ServiceDecorator),
  },
  {
    path: 'inject-async',
    loadComponent: () => import('./2-inject-async/inject-async').then((m) => m.InjectAsync),
  },
  {
    path: 'http-fetch',
    loadComponent: () => import('./3-http-fetch/http-fetch').then((m) => m.HttpFetch),
  },
  {
    path: 'template-improvements',
    loadComponent: () =>
      import('./4-template-improvements/template-improvements').then(
        (m) => m.TemplateImprovements,
      ),
  },
  {
    path: 'debounced-signal',
    loadComponent: () =>
      import('./5-debounced-signal/debounced-signal').then((m) => m.DebouncedSignal),
  },
  {
    path: 'resources',
    loadComponent: () => import('./6-resources/resources').then((m) => m.Resources),
  },
  {
    path: 'webmcp-ai',
    loadComponent: () => import('./7-webmcp-ai/webmcp-ai').then((m) => m.WebmcpAi),
  },
  {
    path: 'onpush-default',
    loadComponent: () => import('./8-onpush-default/onpush-default').then((m) => m.OnPushDefault),
  },
  {
    path: 'signal-forms',
    loadComponent: () => import('./9-signal-forms/signal-forms').then((m) => m.SignalForms),
  },
  { path: '', redirectTo: '/service-decorator', pathMatch: 'full' },
]
