import { Directive, ElementRef, inject } from '@angular/core'
import { outputFromObservable } from '@angular/core/rxjs-interop'
import { SettingsService } from '@quak-vim/core'
import { filter, fromEvent, map } from 'rxjs'

@Directive({
  selector: 'input[searchEngine]',
  standalone: true,
})
export class SearchEngineDirective {
  private readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef)
  private readonly settings = inject(SettingsService)

  readonly searchEngine = outputFromObservable(
    fromEvent<KeyboardEvent>(this.element.nativeElement, 'keydown').pipe(
      filter(({ code }) => code === 'Space'),
      filter(() => {
        const searchEngines = this.settings.get((s) => s.searchEngines)()
        return searchEngines.some((e) => e.prefix === this.element.nativeElement.value)
      }),
      map((event) => {
        event.preventDefault()
        return this.settings
          .get((s) => s.searchEngines)()
          .find((e) => e.prefix === this.element.nativeElement.value)!
      }),
    ),
  )
}
