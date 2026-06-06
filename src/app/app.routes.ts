import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'signal-forms',
    loadComponent: () => import('./1-signal-forms/signal-forms').then((m) => m.SignalForms),
  },
  {
    path: 'resource',
    loadComponent: () => import('./2-resource/resource').then((m) => m.Resource),
  },
  {
    path: 'ai-features',
    loadComponent: () => import('./3-ai-features/ai-features').then((m) => m.AiFeatures),
  },
  {
    path: 'service-inject-async',
    loadComponent: () =>
      import('./4-service-inject-async/service-inject-async').then((m) => m.ServiceInjectAsync),
  },
  {
    path: 'angular-aria',
    loadComponent: () => import('./5-angular-aria/angular-aria').then((m) => m.AngularAria),
  },
  {
    path: 'typescript-6',
    loadComponent: () => import('./6-typescript-6/typescript-6').then((m) => m.TypeScript6),
  },
  {
    path: 'change-detection',
    loadComponent: () =>
      import('./7-change-detection/change-detection').then((m) => m.ChangeDetection),
  },
  {
    path: 'templates',
    loadComponent: () => import('./8-templates/templates').then((m) => m.Templates),
  },
  {
    path: 'signal-debounced',
    loadComponent: () =>
      import('./9-signal-debounced/signal-debounced').then((m) => m.SignalDebounced),
  },
  { path: '', redirectTo: '/signal-forms', pathMatch: 'full' },
]
