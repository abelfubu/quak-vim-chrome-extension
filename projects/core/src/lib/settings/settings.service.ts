import { computed, Injectable, Signal, signal } from '@angular/core'
import { from, Observable, tap } from 'rxjs'
import { Settings } from './settings.model'

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly settings = signal<Settings>({
    theme: 'catppuccin',
    searchEngines: [],
  })

  init(): Observable<Settings> {
    return from(chrome.storage.sync.get<Settings>(null)).pipe(
      tap(this.settings.set),
      // eslint-disable-next-line no-console
      tap((settings) => console.log(JSON.stringify(settings, null, 2))),
    )
  }

  get<Result>(projector: (settings: Settings) => Result): Signal<Result> {
    return computed(() => projector(this.settings()))
  }

  set(settings: Partial<Settings>): void {
    chrome.storage.sync.set(settings, () => {
      this.settings.update((s) => ({ ...s, ...settings }))
    })
  }
}
