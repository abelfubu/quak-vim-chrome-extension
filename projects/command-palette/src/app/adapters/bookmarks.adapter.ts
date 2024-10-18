import { QuakVimPanelItem } from '../models/quak-vim-panel-item.model'
import { favicon } from '../utils/favicon.util'

export function bookmarkAdapter(
  source: chrome.bookmarks.BookmarkTreeNode,
): QuakVimPanelItem {
  return {
    favIconUrl: favicon(source.url),
    id: String(source.id),
    title: source.title,
    type: 'bookmarks',
    url: source.url || '',
    active: false,
    actions: {
      select: () =>
        chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
          chrome.tabs.update(Number(tab.id), { active: true, url: source.url })
        }),
      newTab: () => chrome.tabs.create({ url: source.url, active: true }),
    },
  }
}

export function extractChildren(
  bookmark: chrome.bookmarks.BookmarkTreeNode,
): QuakVimPanelItem[] | undefined {
  return bookmark?.children?.reduce<QuakVimPanelItem[]>((acc, child) => {
    if (child?.url) {
      acc.push(bookmarkAdapter(child))
    } else {
      return acc.concat(extractChildren(child) || [])
    }

    return acc
  }, [])
}
