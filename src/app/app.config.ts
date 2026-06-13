import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideSignalFormsConfig } from '@angular/forms/signals'
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(), // Zone.js added only to demonstrate the 9-onpush-default chapter
    provideSignalFormsConfig({
      classes: { ...NG_STATUS_CLASSES },
    }),
  ],
}
