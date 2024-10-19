import { APP_INITIALIZER, inject } from '@angular/core'
import { SettingsService } from './settings.service'

export function initializeSettings() {
  return {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: () => {
      const settings = inject(SettingsService)

      return () => settings.init()
    },
  }
}
