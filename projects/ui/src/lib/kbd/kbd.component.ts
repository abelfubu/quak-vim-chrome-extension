import { Component, input } from '@angular/core'

@Component({
  selector: 'kbd[quak-vim-kbd]',
  standalone: true,
  host: {
    '[style.--width]': 'width()',
    '[style.--height]': 'height()',
  },
  template: `<ng-content />`,
  styles: `
    :host {
      margin: 3px;
      position: relative;
      display: inline-flex;
      width: fit-content;
      min-width: var(--width);
      height: var(--height);
      border-radius: 8px;
      background: linear-gradient(180deg, var(--base01), var(--base02));
      padding: 3px 4px 4px 4px;
      box-shadow:
        inset -8px 0 8px rgba(0, 0, 0, 0.25),
        inset 0 -8px 8px rgba(0, 0, 0, 0.25),
        0 0 0 2px rgba(0, 0, 0, 0.75),
        10px 20px 25px rgba(0, 0, 0, 0.4);

      &::before {
        content: attr(data-key);
        width: 100%;
        padding: 0 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(90deg, var(--base01), var(--base03));
        border-radius: 8px;
        box-shadow:
          -10px -10px 10px rgba(255, 255, 255, 0.25),
          10px 5px 10px rgba(0, 0, 0, 0.15);
        border-left: 1px solid #0004;
        border-bottom: 1px solid #0004;
        border-top: 1px solid #0009;
      }
    }
  `,
})
export class KbdComponent {
  readonly height = input('37px')
  readonly width = input('37px')
}
