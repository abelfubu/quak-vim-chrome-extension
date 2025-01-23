import { QuakVimPanelItem } from '../models/quak-vim-panel-item.model'
import { Raindrop } from '../models/raindrop.model'
import { favicon } from '../utils/favicon.util'

export function raindropAdapter(source: Raindrop): QuakVimPanelItem {
  return {
    favIconUrl: favicon(source.link),
    id: String(source._id),
    title: source.title,
    type: 'bookmarks',
    url: source.link || '',
    active: false,
    actions: {
      select: () =>
        chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
          chrome.tabs.update(Number(tab.id), { active: true, url: source.link })
        }),
      newTab: () => chrome.tabs.create({ url: source.link, active: true }),
    },
  }
}
