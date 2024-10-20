import { inject, Injectable } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, Validators } from '@angular/forms'
import { Settings, ThemeService } from '@quak-vim/core'
import { debounceTime, distinctUntilChanged } from 'rxjs'

@Injectable()
export class AppOptionsFormService {
  private readonly formBuilder = inject(FormBuilder)
  private readonly theme = inject(ThemeService)

  readonly form = this.formBuilder.nonNullable.group({
    theme: '',
    searchEngines: this.formBuilder.nonNullable.array([
      this.formBuilder.nonNullable.group({
        prefix: ['', Validators.required],
        url: ['', Validators.required],
      }),
    ]),
  })

  readonly themes = this.theme.themes

  readonly changeReady$ = this.form.valueChanges.pipe(
    takeUntilDestroyed(),
    debounceTime(300),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
  )

  getRawValue(): Settings {
    return this.form.getRawValue()
  }

  addSearchEngine(): void {
    this.form.controls.searchEngines.push(
      this.formBuilder.nonNullable.group({
        prefix: ['', Validators.required],
        url: ['', Validators.required],
      }),
      { emitEvent: false },
    )
  }

  removeSearchEngine(index: number): void {
    this.form.controls.searchEngines.removeAt(index)
  }

  patchForm(settings: Settings): void {
    this.form.controls.searchEngines.clear()
    ;(settings.searchEngines || [{}]).forEach(() => {
      this.addSearchEngine()
    })

    this.form.patchValue(settings, { emitEvent: false })
  }
}
