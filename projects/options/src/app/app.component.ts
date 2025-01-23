import { Component, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ReactiveFormsModule } from '@angular/forms'
import { SettingsService } from '@quak-vim/core'
import { DividerModule } from 'primeng/divider'
import { AppOptionsFormService } from './app-options-form.service'
import { HeaderComponent } from './components/header/header.component'
import { SearchEnginesListComponent } from './components/search-engines-list/search-engines-list.component'
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component'

@Component({
  selector: 'qvo-root',
  imports: [
    DividerModule,
    HeaderComponent,
    ReactiveFormsModule,
    ThemeSelectorComponent,
    SearchEnginesListComponent,
  ],
  providers: [AppOptionsFormService],
  host: {
    class: 'block',
    style: 'font-size: 18px',
  },
  template: `
    <qvo-header />

    <main class="p-4 flex flex-col gap-4">
      <h1 class="text-3xl">Configuration</h1>

      <p-divider />

      <form [formGroup]="options.form" class="flex flex-col w-full gap-6">
        <qvo-theme-selector [themes]="options.themes" formControlName="theme" />

        <p-divider />

        <qvo-search-engines-list />

        <p-divider />

        <div>
          <label class="mb-2 block" for="raindropToken">Raindrop.io Token</label>
          <input
            type="text"
            id="raindropToken"
            pInputText
            class="px-3 py-2 w-full"
            formControlName="raindropToken" />
        </div>
      </form>
    </main>
  `,
})
export class AppComponent implements OnInit {
  protected readonly options = inject(AppOptionsFormService)
  protected readonly settings = inject(SettingsService)

  formChangedSubscription = this.options.changeReady$
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.settings.set(this.options.getRawValue()))

  async ngOnInit(): Promise<void> {
    this.options.patchForm(this.settings.get((s) => s)())
  }
}
