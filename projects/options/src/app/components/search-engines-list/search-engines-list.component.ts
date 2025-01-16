import { Component, inject } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { AppOptionsFormService } from '../../app-options-form.service'
import { SearchEngineControlComponent } from '../search-engine-control/search-engine-control.component'

@Component({
    selector: 'qvo-search-engines-list',
    imports: [SearchEngineControlComponent, ButtonModule],
    template: `
    <div formArrayName="searchEngines" class="flex flex-col gap-4">
      <label class="mb-2 block" for="search-engines">Search Engines</label>

      <div class="flex flex-col gap-1">
        @for (
          searchEngine of options.form.controls.searchEngines.controls;
          track $index
        ) {
          <qvo-search-engine-control
            [form]="searchEngine"
            (removeSearchEngine)="options.removeSearchEngine($index)" />
        }
      </div>

      <div>
        <p-button
          label="ADD"
          icon="pi pi-plus"
          (click)="options.addSearchEngine()"></p-button>
      </div>
    </div>
  `
})
export class SearchEnginesListComponent {
  protected readonly options = inject(AppOptionsFormService)
}
