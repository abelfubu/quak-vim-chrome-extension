import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { AppStore } from './app.store'
import { InputComponent } from './components/input/input.component'
import { ListResultsComponent } from './components/list-results/list-results.component'
import { isValidQuakVimPanelType } from './validators/quak-vim-panel-type.validator'

@Component({
  selector: 'qv-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, ListResultsComponent],
  host: {
    '(window:keyup.Escape)': 'store.close()',
    '(window:keydown.ArrowUp)': '$event.preventDefault();store.setIndex(-1)',
    '(window:keydown.ArrowDown)': '$event.preventDefault();store.setIndex(1)',
    '(window:keydown.control.x)': '$event.preventDefault();store.closeTab()',
    '(window:keydown.Enter)': 'store.select()',
    '(window:keydown.control.Enter)': 'store.newTab()',
  },
  template: `
    <qv-input (inputChanged)="store.setQuery($event)" />
    <qv-list-results />
  `,
})
export class AppComponent implements OnInit {
  protected readonly store = inject(AppStore)

  ngOnInit(): void {
    const action = new URL(window.location.href).searchParams.get('action')

    if (!isValidQuakVimPanelType(action)) {
      throw new Error(`Unsupported action: ${action}`)
    }

    if (['tabs', 'bookmarks'].includes(action)) {
      console.log(action, 'HIT')
      this.store.setInitialSelection(true)
    }

    this.store.load(action)
  }
}
