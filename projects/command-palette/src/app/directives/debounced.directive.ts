import { Directive, ElementRef, inject } from '@angular/core'
import { outputFromObservable } from '@angular/core/rxjs-interop'
import { fromEvent, map } from 'rxjs'

@Directive({
  selector: 'input[debounced]',
  standalone: true,
})
export class DebouncedDirective {
  private readonly element = inject(ElementRef)

  readonly debounced = outputFromObservable(
    fromEvent(this.element.nativeElement, 'input').pipe(
      map(() => this.element.nativeElement.value),
    ),
  )
}
