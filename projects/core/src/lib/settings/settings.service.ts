import { computed, Injectable, Signal, signal } from '@angular/core'
import { Settings } from '@quak-vim/models'
import { from, Observable, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly settings = signal<Settings>({
    theme: 'catppuccin',
    raindropToken: '',
    searchEngines: [],
    commands: [
      {
        shortcut: { key: '?', ctrl: false, alt: false, shift: false },
        description: 'Show the help dialog for a list of all available keys.',
      },
      {
        shortcut: { key: 'j', ctrl: false, alt: false, shift: false },
        description: 'Scroll down the page.',
      },
      {
        shortcut: { key: 'k', ctrl: false, alt: false, shift: false },
        description: 'Scroll up the page.',
      },
      {
        shortcut: { key: 'g', ctrl: false, alt: false, shift: false },
        description: 'Scroll to the top of the page.',
      },
      {
        shortcut: { key: 'G', ctrl: false, alt: false, shift: true },
        description: 'Scroll to the bottom of the page.',
      },
      {
        shortcut: { key: 'f', ctrl: false, alt: false, shift: false },
        description: 'Open a link in the current tab by highlighting links.',
      },
      {
        shortcut: { key: 'o', ctrl: false, alt: false, shift: false },
        description: 'Open history in the current tab or new tab.',
      },
      {
        shortcut: { key: 'b', ctrl: false, alt: false, shift: false },
        description: 'Open a bookmark in the current tab or new tab.',
      },
      {
        shortcut: { key: 'T', ctrl: false, alt: false, shift: true },
        description: 'Search through your open tabs.',
      },
      {
        shortcut: { key: 'h', ctrl: false, alt: false, shift: false },
        description: 'Go back in history.',
      },
      {
        shortcut: { key: 'l', ctrl: false, alt: false, shift: false },
        description: 'Go forward in history.',
      },
    ],
  })

  init(): Observable<Settings> {
    return from(chrome.storage.sync.get<Settings>(null)).pipe(
      tap((s) => this.settings.set({ ...s, commands: this.settings().commands })),
    )
  }

  get<Result>(projector: (settings: Settings) => Result): Signal<Result> {
    return computed(() => projector(this.settings()))
  }

  set(settings: Partial<Settings>): void {
    chrome.storage.sync.set(settings, () => {
      this.settings.update((s) => ({ ...s, ...settings, commands: s.commands }))
    })
  }
}
