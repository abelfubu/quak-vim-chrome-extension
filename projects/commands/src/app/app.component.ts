import { TitleCasePipe, UpperCasePipe } from '@angular/common'
import { Component, ElementRef, inject, OnInit } from '@angular/core'
import { SettingsService, ThemeService } from '@quak-vim/core'
import { KbdComponent } from '@quak-vim/ui'

@Component({
  selector: 'qvc-root',
  standalone: true,
  imports: [UpperCasePipe, TitleCasePipe, KbdComponent],
  host: {
    '(window:keydown.Escape)': 'close()',
    '(window:blur)': 'close()',
    'tabindex': '1',
  },
  template: `
    <div class="max-w-3xl mx-auto bg-[var(--base01)] rounded-lg shadow-lg p-6 space-y-8">
      <h1 class="text-2xl font-semibold text-center">? Help Dialog</h1>

      <section class="space-y-2">
        @for (command of commands(); track command.shortcut.key) {
          <div
            class="flex items-center justify-between gap-1 border border-[var(--base02)] rounded-lg p-1">
            <span class="ml-3 text-[var(--base07)]">{{ command.description }} </span>

            <div>
              @if (command.shortcut.ctrl) {
                <kbd quak-vim-kbd class="text-xs" data-key="Ctrl"></kbd>
              }

              @if (command.shortcut.shift) {
                <kbd quak-vim-kbd class="key text-xs" data-key="Shift"></kbd>
              }

              @if (command.shortcut.alt) {
                <kbd quak-vim-kbd class="key text-xs" data-key="Alt"></kbd>
              }

              <kbd quak-vim-kbd [attr.data-key]="command.shortcut.key | uppercase"></kbd>
            </div>
          </div>
        }
      </section>
    </div>
  `,
})
export class AppComponent implements OnInit {
  private readonly theme = inject(ThemeService)
  protected readonly commands = inject(SettingsService).get((s) => s.commands)
  private readonly element = inject(ElementRef)
  readonly modKeys = ['ctrl', 'shift', 'alt'] as const

  ngOnInit(): void {
    this.element.nativeElement.focus()
    this.theme.init()
  }

  close(): void {
    chrome.tabs.query({ active: true }).then(([tab]) => {
      chrome.tabs.sendMessage(Number(tab.id), { action: 'close' })
    })
  }
}
