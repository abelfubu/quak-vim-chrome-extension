import { Component, inject } from '@angular/core'
import { AppStore } from '../../app.store'
import { KbdHintComponent } from '../kbd-hint/kbd-hint.component'
import { ListItemComponent } from '../list-item/list-item.component'

@Component({
  selector: 'qv-list-results',
  standalone: true,
  imports: [KbdHintComponent, ListItemComponent],
  template: `
    <ul class="h-full w-full list-none">
      @for (result of store.results(); track result.id) {
        <qv-list-item [item]="result" [active]="$index === store.index()" />
      }
    </ul>
  `,
})
export class ListResultsComponent {
  protected readonly store = inject(AppStore)
}
