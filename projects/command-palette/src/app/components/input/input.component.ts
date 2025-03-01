import { UpperCasePipe } from '@angular/common'
import { Component, effect, ElementRef, inject, output, viewChild } from '@angular/core'
import { AppStore } from '../../app.store'
import { DebouncedDirective } from '../../directives/debounced.directive'
import { SearchEngineDirective } from '../../directives/search-engine.directive'

@Component({
    selector: 'qv-input',
    imports: [DebouncedDirective, SearchEngineDirective, UpperCasePipe],
    template: `
    <div class="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="absolute left-4 top-6 w-[22px] h-[22px]">
        <path
          d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
          fill="var(--base05)" />
      </svg>
      <input
        #input
        [spellcheck]="false"
        type="text"
        [value]="store.query()"
        (debounced)="inputChanged.emit($event)"
        (searchEngine)="store.setSearchEngine($event)"
        class="text-[var(--base05)] p-5 text-xl w-full outline-none border-none pl-14 bg-[#111111]" />

      <small class="absolute left-2 top-1">
        {{ store.searchEngine()?.prefix || '' | uppercase }}
      </small>
    </div>
  `
})
export class InputComponent {
  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>('input')
  protected readonly store = inject(AppStore)

  focusInputEffect = effect(() => this.input().nativeElement.focus())
  readonly inputChanged = output<string>()
}
