import { ENVIRONMENT_INITIALIZER } from '@angular/core'

export function metaInitializer() {
  return {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useFactory: () => {
      return () => {
        const meta = document.createElement('meta')
        meta.content =
          document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]')?.content ??
          'light'
        meta.name = 'color-scheme'
        document.head.appendChild(meta)
        return Promise.resolve()
      }
    },
  }
}
