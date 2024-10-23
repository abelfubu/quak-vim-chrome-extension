import { Component, HostAttributeToken, inject, input } from '@angular/core'
import { Shortcut } from '@quak-vim/models'
import { KbdComponent } from '@quak-vim/ui'

@Component({
  selector: 'qv-kbd-hint',
  standalone: true,
  imports: [KbdComponent],
  template: `
    <div class="flex flex-col items-center gap-1">
      <small class="text-xs">{{ action }}</small>

      <div class="flex gap-0.5">
        @if (shortcut().ctrl) {
          <kbd class="text-xs" height="28px" quak-vim-kbd data-key="Ctrl"></kbd>
        }

        @if (shortcut().shift) {
          <kbd class="text-xs" height="28px" quak-vim-kbd data-key="Shift"></kbd>
        }

        @if (shortcut().alt) {
          <kbd class="text-xs" height="28px" quak-vim-kbd data-key="Alt"></kbd>
        }

        <kbd
          class="text-xs"
          height="28px"
          quak-vim-kbd
          [attr.data-key]="shortcut().key"></kbd>
      </div>
    </div>
  `,
})
export class KbdHintComponent {
  protected readonly action = inject(new HostAttributeToken('action'))
  readonly shortcut = input.required<Shortcut>()
}
