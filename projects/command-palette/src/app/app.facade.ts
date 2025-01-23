import { inject, Injectable } from '@angular/core'
import { RaindropService } from './services/raindrop.service'
import { Observable } from 'rxjs'
import { QuakVimItemType } from './models/quak-vim-item.type'
import { QuakVimPanelItem } from './models/quak-vim-panel-item.model'
import { BrowserService } from './services/browser.service'

@Injectable({
  providedIn: 'root',
})
export class AppFacade {
  private readonly browser = inject(BrowserService)
  private readonly raindrop = inject(RaindropService)

  load(action: QuakVimItemType): Observable<QuakVimPanelItem[]> {
    if (action === 'tabs') {
      return this.browser.getTabs()
    }

    if (action === 'bookmarks') {
      return this.raindrop.getRaindrops()
    }

    if (action === 'history') {
      return this.browser.getHistory()
    }

    throw new Error(`Unsupported action: ${action}`)
  }
}
