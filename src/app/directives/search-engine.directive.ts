import { Directive, ElementRef, inject } from '@angular/core'
import { outputFromObservable } from '@angular/core/rxjs-interop'
import { filter, fromEvent } from 'rxjs'
import { SIGNAL_VALUE } from '../core/signal-value.token'

@Directive({
  selector: 'input[searchEngine]',
  standalone: true,
})
export class SearchEngineDirective {
  private readonly signalValue = inject(SIGNAL_VALUE)
  private readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef)

  readonly searchEngine = outputFromObservable(
    fromEvent<KeyboardEvent>(this.element.nativeElement, 'keyup').pipe(
      filter((event) => event.key === ' ' && this.signalValue() === 'google'),
    ),
  )
}
