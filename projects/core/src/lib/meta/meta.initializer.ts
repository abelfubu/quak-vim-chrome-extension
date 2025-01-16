import { provideEnvironmentInitializer } from '@angular/core'

export function metaInitializer() {
  return provideEnvironmentInitializer(() => {
        const initializerFn = (() => {
      return () => {
        const meta = document.createElement('meta')
        meta.content =
          document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]')?.content ??
          'light'
        meta.name = 'color-scheme'
        document.head.appendChild(meta)
        return Promise.resolve()
      }
    })();
        return initializerFn();
      })
}
