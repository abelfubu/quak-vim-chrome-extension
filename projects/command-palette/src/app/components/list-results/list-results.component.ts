import { Component, inject } from '@angular/core'
import { AppStore } from '../../app.store'
import { ListItemComponent } from '../list-item/list-item.component'

@Component({
  selector: 'qv-list-results',
  imports: [ListItemComponent],
  template: `
    <ul class="h-full w-full list-none bg-[var(--base01)]">
      @for (result of store.results(); track result.id) {
        <qv-list-item [item]="result" [active]="$index === store.index()" />
      }
    </ul>
  `,
})
export class ListResultsComponent {
  protected readonly store = inject(AppStore)
}
