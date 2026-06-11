import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideHttpClient } from '@angular/common/http'
import { provideRouter } from '@angular/router'
import { provideSignalFormsConfig } from '@angular/forms/signals'
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideSignalFormsConfig({
      classes: { ...NG_STATUS_CLASSES },
    }),
  ],
}
