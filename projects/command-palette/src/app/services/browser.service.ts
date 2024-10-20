import { Injectable } from '@angular/core'
import { from, map, Observable } from 'rxjs'
import { extractChildren } from '../adapters/bookmarks.adapter'
import { historyAdapter } from '../adapters/history.adapter'
import { tabAdapter } from '../adapters/tab.adapter'
import { BookmarkMe } from '../custom-items/bookmark-me'
import { QuakVimItemType } from '../models/quak-vim-item.type'
import { QuakVimPanelItem } from '../models/quak-vim-panel-item.model'

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  load(action: QuakVimItemType): Observable<QuakVimPanelItem[]> {
    if (action === 'tabs') {
      return this.getTabs()
    }

    if (action === 'bookmarks') {
      return this.getBookmarks()
    }

    if (action === 'history') {
      return this.getHistory()
    }

    throw new Error(`Unsupported action: ${action}`)
  }

  getTabs(): Observable<QuakVimPanelItem[]> {
    return from(chrome.tabs.query({})).pipe(map((items) => items.map(tabAdapter)))
  }

  getHistory(): Observable<QuakVimPanelItem[]> {
    return from(chrome.history.search({ text: '', maxResults: 500 })).pipe(
      map((items) => items.map(historyAdapter)),
    )
  }

  navigateToInNewTab(url: string): void {
    chrome.tabs.create({ active: true, url })
  }

  navigateTo(url: string): void {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
      chrome.tabs.update(Number(tab.id), { active: true, url })
    })
  }

  search(term: string): Promise<void> {
    return chrome.search.query({ text: term })
  }

  searchInNewTab(term: string): void {
    chrome.tabs.create({ active: true }).then((tab) => {
      return chrome.search.query({ text: term, tabId: tab.id })
    })
  }

  getBookmarks(): Observable<QuakVimPanelItem[]> {
    return from(chrome.bookmarks.getTree()).pipe(
      map((items) =>
        items.reduce<QuakVimPanelItem[]>(
          (acc, bookmark) => acc.concat(BookmarkMe, extractChildren(bookmark) || []),
          [],
        ),
      ),
    )
  }

  close(): void {
    chrome.tabs.query({ active: true }).then(([tab]) => {
      chrome.tabs.sendMessage(Number(tab.id), { action: 'close' })
    })
  }
}
