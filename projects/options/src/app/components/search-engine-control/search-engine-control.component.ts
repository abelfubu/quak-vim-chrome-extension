import { Component, input, output } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'qvo-search-engine-control',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  template: `
    <div [formGroup]="form()">
      <div class="flex gap-2">
        <label class="w-1/6" for="prefix">Prefix</label>
        <label class="w-5/6" for="prefix">URL</label>
      </div>
      <div class="flex gap-2 items-center">
        <input type="text" pInputText class="w-1/6 px-3 py-2" formControlName="prefix" />
        <input type="text" pInputText class="w-5/6 px-3 py-2" formControlName="url" />
        <p-button icon="pi pi-trash" (click)="removeSearchEngine.emit()" />
      </div>
    </div>
  `,
})
export class SearchEngineControlComponent {
  form = input.required<FormGroup>()

  removeSearchEngine = output<void>()
}
