import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { initializeSettings } from '@quak-vim/core'
import { initializeTheme } from './core/initializers/theme.initializer'

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
    initializeSettings(),
    initializeTheme(),
  ],
}
