import { Component, input } from '@angular/core'
import { QuakVimPanelItem } from '../../models/quak-vim-panel-item.model'
import { ItemTypeIconComponent } from '../item-type-icon/item-type-icon.component'
import { KbdHintComponent } from '../kbd-hint/kbd-hint.component'

@Component({
    selector: 'qv-list-item',
    imports: [KbdHintComponent, ItemTypeIconComponent],
    template: `
    <!-- [class.bg-[var(--base00)]]="active()" -->
    <li
      class="relative p-2 rounded-md m-1 overflow-hidden border-solid border shadow-custom"
      [class.active]="active()"
      [class.border-[var(--base00)]]="!active()"
      [class.border-[var(--base04)]]="active()">
      <div class="flex gap-2 items-center">
        <qv-item-type-icon [type]="item().type" />
        <span
          [innerHTML]="item().title"
          class="truncate w-full text-[var(--base05)]"></span>
      </div>

      <div class="flex items-center gap-2">
        <img
          #img
          [src]="item().favIconUrl"
          [alt]="item().title"
          [height]="22"
          [width]="22"
          class="w-[22px] h-[22px] aspect-square rounded-md"
          (error)="onImageError(img, item().chromeFaviconUrl)" />
        <span
          [innerHTML]="item().url"
          class="text-[var(--base0D)] font-light truncate flex-1"></span>
      </div>

      @if (active()) {
        <div
          class="absolute top-0 right-0 bottom-0 flex gap-2 items-center justify-end p-2 bg-[var(--base01)]">
          @if (item().actions.close) {
            <qv-kbd-hint
              action="close"
              [shortcut]="{ ctrl: true, key: 'X', alt: false, shift: false }" />
          }
          @if (item().actions.newTab) {
            <qv-kbd-hint
              action="new tab"
              [shortcut]="{ ctrl: true, key: 'Enter', alt: false, shift: false }" />
          }
        </div>
      }
    </li>
  `,
    styles: `
    :host {
      font-size: 18px;
    }
  `
})
export class ListItemComponent {
  readonly item = input.required<QuakVimPanelItem>()
  readonly active = input.required<boolean>()

  onImageError(target: HTMLImageElement, fallback?: string) {
    if (target.src === fallback || !fallback) return
    target.src = fallback
  }
}
