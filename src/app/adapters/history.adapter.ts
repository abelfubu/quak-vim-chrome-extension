import { QuakVimPanelItem } from '../models/quak-vim-panel-item.model'
import { favicon } from '../utils/favicon.util'

export function historyAdapter(source: chrome.history.HistoryItem): QuakVimPanelItem {
  return {
    active: false,
    favIconUrl: favicon(source.url),
    id: source.id,
    title: source.title || '',
    type: 'history',
    url: source.url || '',
    actions: {
      select: () =>
        chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
          chrome.tabs.update(Number(tab.id), { active: true, url: source.url })
        }),
      newTab: () => chrome.tabs.create({ url: source.url, active: true }),
    },
  }
}
