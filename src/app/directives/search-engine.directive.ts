import { Directive, ElementRef, inject } from '@angular/core'
import { outputFromObservable } from '@angular/core/rxjs-interop'
import { filter, fromEvent, tap } from 'rxjs'

@Directive({
  selector: 'input[searchEngine]',
  standalone: true,
})
export class SearchEngineDirective {
  private readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef)

  readonly searchEngine = outputFromObservable(
    fromEvent<KeyboardEvent>(this.element.nativeElement, 'keydown').pipe(
      filter((event) => {
        console.log({ code: event.code, value: this.element.nativeElement.value })
        return event.code === 'Space' && this.element.nativeElement.value === 'google'
      }),
      tap((event) => event.preventDefault()),
    ),
  )
}
