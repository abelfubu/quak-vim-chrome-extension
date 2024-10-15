import { Component, input, model, signal } from '@angular/core'

@Component({
  standalone: true,
  selector: 'qvo-select',
  host: { class: 'block' },
  template: `
    <div class="relative inline-block text-left w-full">
      <div>
        <button
          (click)="open.set(!open())"
          class="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          aria-haspopup="true"
          aria-expanded="true">
          {{ model().label || 'Select an option' }}
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M5.292 7.292a1 1 0 011.415 0L10 10.585l3.292-3.293a1 1 0 011.415 1.415L10 13.415l-4.707-4.707a1 1 0 010-1.415z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      @if (open()) {
        <div
          class="absolute z-10 origin-top-right left-0 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            class="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu">
            @for (option of options(); track $index) {
              <div
                (click)="model.set(option)"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white cursor-pointer"
                role="menuitem">
                {{ option.label }}
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class SelectComponent<U, T extends { label: string; value: U }> {
  readonly open = signal(false)
  readonly options = input.required<T[]>()
  readonly model = model.required<T>()
}
