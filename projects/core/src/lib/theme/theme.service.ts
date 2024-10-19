import { effect, inject, Injectable } from '@angular/core'
import { SettingsService } from '../settings/settings.service'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly theme = inject(SettingsService).get((s) => s.theme)

  private readonly elements: HTMLElement[] = [document.body]

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

  init(...elements: HTMLElement[]): void {
    this.elements.concat(elements)
  }

  themeChanged = effect(() => {
    this.elements.forEach((element) => {
      element.setAttribute('class', this.theme())
    })
  })
}
