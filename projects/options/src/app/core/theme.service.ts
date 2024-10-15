import { effect, inject, Injectable } from '@angular/core'
import { SettingsService } from './settings.service'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly theme = inject(SettingsService).get((s) => s.theme)
  readonly themes = [
    {
      label: 'Catppuccin',
      value: 'catppuccin',
    },
    {
      label: 'Dracula',
      value: 'dracula',
    },
    {
      label: 'Gruvbox',
      value: 'gruvbox',
    },
    {
      label: 'Nord',
      value: 'nord',
    },
    {
      label: 'One dark',
      value: 'one-dark',
    },
    {
      label: 'Rose pine',
      value: 'rose-pine',
    },
    {
      label: 'Tokyo night',
      value: 'tokyo-night',
    },
  ]

  themeChanged = effect(() => {
    document.body.setAttribute('class', this.theme())
  })
}
