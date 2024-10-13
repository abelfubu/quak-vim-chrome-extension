import { QuakVimPanelItem } from '../models/quak-vim-panel-item.model'
import { favicon } from '../utils/favicon.util'

export const BookmarkMe: QuakVimPanelItem = {
  id: crypto.randomUUID(),
  type: 'bookmarks',
  title: 'Bookmark this page',
  url: 'Add this page to bookmarks',
  favIconUrl: favicon('chrome://bookmarks'),
  chromeFaviconUrl: '',
  active: false,
  actions: {
    select: () =>
      chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
        chrome.bookmarks.create({ url: tab.url, title: tab.title })
      }),
  },
}
