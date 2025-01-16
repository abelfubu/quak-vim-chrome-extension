import { Component, input, signal } from '@angular/core'
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'
import { SelectModule } from 'primeng/select'

interface Theme {
  label: string
  value: string
}

@Component({
    selector: 'qvo-theme-selector',
    imports: [SelectModule, FormsModule],
    template: `
    <label class="mb-2 block" for="theme">Choose a theme</label>

    <p-select
      class="w-1/3"
      [disabled]="disabled()"
      inputId="theme"
      [options]="themes()"
      [(ngModel)]="value"
      (ngModelChange)="[onChange($event), onTouched()]" />
  `,
    styles: `
    :host {
      display: block;
    }
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ThemeSelectorComponent,
            multi: true,
        },
    ]
})
export class ThemeSelectorComponent implements ControlValueAccessor {
  readonly themes = input.required<Theme[]>()
  protected readonly value = signal<string>('')
  protected readonly disabled = signal(false)

  onChange = (value: string) => value
  onTouched = () => null

  writeValue(value: string): void {
    this.value.set(value)
  }

  registerOnChange(fn: () => string): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => null): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }
}
