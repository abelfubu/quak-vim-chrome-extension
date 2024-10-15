import { Component } from '@angular/core'

@Component({
  selector: 'qvo-header',
  standalone: true,
  template: `
    <header class="flex items-center p-4">
      <div class="flex gap-1 items-center">
        <img src="/icons/icon32.png" alt="Quak Vim" />
        <h1 class="text-3xl">QuakVim</h1>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
