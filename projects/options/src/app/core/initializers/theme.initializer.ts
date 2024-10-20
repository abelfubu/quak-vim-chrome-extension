import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core'
import { PrimeNGConfig } from 'primeng/api'
import { definePreset } from 'primeng/themes'
import { Aura } from 'primeng/themes/aura'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
  },
})

export function initializeTheme() {
  return {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useFactory: () => {
      const config = inject(PrimeNGConfig)
      return () => {
        config.theme.set({
          preset: MyPreset,
          options: {
            cssLayer: {
              name: 'primeng',
              order: 'tailwind-base, primeng, tailwind-utilities',
            },
          },
        })
        Promise.resolve()
      }
    },
  }
}
