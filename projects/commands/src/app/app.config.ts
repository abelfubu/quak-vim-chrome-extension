import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core'
import { initializeSettings, metaInitializer } from '@quak-vim/core'

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    metaInitializer(),
    initializeSettings(),
    metaInitializer(),
  ],
}
