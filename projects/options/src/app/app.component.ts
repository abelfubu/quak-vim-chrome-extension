import { Component, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { SettingsService, ThemeService } from '@quak-vim/core'
import { PrimeNGConfig } from 'primeng/api'
import { SelectModule } from 'primeng/select'
import { definePreset } from 'primeng/themes'
import { Aura } from 'primeng/themes/aura'
import { HeaderComponent } from './components/header/header.component'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
  },
})

@Component({
  selector: 'qvo-root',
  standalone: true,
  imports: [HeaderComponent, SelectModule, ReactiveFormsModule],
  host: {
    class: 'block',
    style: 'font-size: 18px',
  },
  template: `
    <qvo-header />

    <main class="p-4 flex flex-col gap-4">
      <h1 class="text-3xl">Configuration</h1>

      <form [formGroup]="form" class="flex w-full">
        <div class="w-1/3">
          <label class="text-base mb-2 block" for="theme">Choose a theme</label>
          <p-select
            formControlName="theme"
            class="w-full"
            inputId="theme"
            [options]="theme.themes" />
        </div>
      </form>

      <button (click)="settings.set({ keybindings: {} })">CLICK</button>
    </main>
  `,
})
export class AppComponent implements OnInit {
  private readonly config = inject(PrimeNGConfig)
  private readonly formBuilder = inject(FormBuilder)
  protected readonly theme = inject(ThemeService)
  protected readonly settings = inject(SettingsService)

  protected readonly form = this.formBuilder.nonNullable.group({
    theme: [''],
  })

  formChangedSubscription = this.form.valueChanges
    .pipe(takeUntilDestroyed())
    .subscribe((value) => this.settings.set(value))

  async ngOnInit(): Promise<void> {
    this.form.patchValue(
      { theme: this.settings.get((s) => s.theme)() },
      { emitEvent: false },
    )

    this.config.theme.set({
      preset: MyPreset,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
      },
    })
  }
}
