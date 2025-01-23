import { inject, Injectable } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, Validators } from '@angular/forms'
import { ThemeService } from '@quak-vim/core'
import { Settings } from '@quak-vim/models'
import { debounceTime, distinctUntilChanged } from 'rxjs'

@Injectable()
export class AppOptionsFormService {
  private readonly formBuilder = inject(FormBuilder)
  private readonly theme = inject(ThemeService)

  readonly form = this.formBuilder.nonNullable.group({
    theme: '',
    raindropToken: '',
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

  // 20/10/2024
  // TODO: This should not be partial when commands is complete
  getRawValue(): Partial<Settings> {
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
