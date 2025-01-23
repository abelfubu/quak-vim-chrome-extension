import { provideHttpClient } from '@angular/common/http'
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core'
import { initializeSettings, metaInitializer } from '@quak-vim/core'

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    initializeSettings(),
    provideHttpClient(),
    metaInitializer(),
  ],
}
