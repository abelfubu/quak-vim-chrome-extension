import { Component, HostAttributeToken, inject } from '@angular/core'

@Component({
  selector: 'qv-kbd-hint',
  standalone: true,
  template: `
    <kbd class="flex">
      <small>{{ action }}</small>
      <small>{{ shortcut }}</small>
    </kbd>
  `,
  styles: `
    kbd {
      display: flex;
      flex-direction: column;
      min-width: 21px;
      padding: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica,
        Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
      font-size: 13px;
      color: var(--base07);
      line-height: 1.5;
      text-align: center;
      border-radius: 4px;
      background-color: var(--base01);
      border: 1px solid var(--base02);
    }
  `,
})
export class KbdHintComponent {
  protected readonly action = inject(new HostAttributeToken('action'))
  protected readonly shortcut = inject(new HostAttributeToken('shortcut'))
}
