import { QuakVimPanelItem } from '../models/quak-vim-panel-item.model'
import { favicon } from '../utils/favicon.util'

export function tabAdapter(item: chrome.tabs.Tab): QuakVimPanelItem {
  return {
    active: false,
    chromeFaviconUrl: favicon(item.url),
    favIconUrl: item.favIconUrl || '',
    id: item.id,
    title: item.title || item.url?.split('//')[1] || '',
    type: 'tabs',
    url: item.url || 'chrome://new-tab-page/',
    windowId: item.windowId,
    actions: {
      select: () => chrome.tabs.update(Number(item.id), { active: true }),
      close: () => chrome.tabs.remove(Number(item.id)).catch(console.error),
    },
  }
}
