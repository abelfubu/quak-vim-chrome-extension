import { inject, provideAppInitializer } from '@angular/core'
import { SettingsService } from './settings.service'

export function initializeSettings() {
  return provideAppInitializer(() => {
        const initializerFn = (() => {
      const settings = inject(SettingsService)

      return () => settings.init()
    })();
        return initializerFn();
      })
}
