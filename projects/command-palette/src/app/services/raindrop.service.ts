import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { SettingsService } from '@quak-vim/core'
import { map, Observable } from 'rxjs'
import { QuakVimPanelItem } from '../models/quak-vim-panel-item.model'
import { RaindropResponse } from '../models/raindrop-response.model'
import { raindropAdapter } from '../adapters/raindrop.adapter'

@Injectable({
  providedIn: 'root',
})
export class RaindropService {
  private readonly http = inject(HttpClient)
  private readonly settings = inject(SettingsService)
  getRaindrops(): Observable<QuakVimPanelItem[]> {
    return this.http
      .get<RaindropResponse>('https://api.raindrop.io/rest/v1/raindrops/0', {
        headers: {
          Authorization: `Bearer ${this.settings.get((s) => s.raindropToken)()}`,
        },
      })
      .pipe(map(({ items }) => items.map(raindropAdapter)))
  }
}
