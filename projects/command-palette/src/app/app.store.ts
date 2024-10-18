import { computed, inject } from '@angular/core'
import { tapResponse } from '@ngrx/operators'
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import Fuse from 'fuse.js'
import { pipe, switchMap } from 'rxjs'
import { QuakVimItemType } from './models/quak-vim-item.type'
import { QuakVimPanelItem } from './models/quak-vim-panel-item.model'
import { BrowserService } from './services/browser.service'
import { highlightMatches } from './utils/highlight-matches.util'

interface AppState {
  items: QuakVimPanelItem[]
  query: string
  index: number
  withInitialSelection: boolean
  searchEngine: string
}

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>({
    items: [],
    query: '',
    index: -1,
    withInitialSelection: false,
    searchEngine: '',
  }),
  withComputed((store) => ({
    results: computed(() => {
      if (!store.query() && store.withInitialSelection()) {
        return store.items().slice(0, 8)
      }

      const fuse = new Fuse(store.items(), {
        keys: ['title', 'url'],
        includeMatches: true,
        shouldSort: true,
      })

      const filtered = fuse.search(store.query())

      return filtered.slice(0, 8).map(({ item, matches }) => {
        const clonedItem = { ...item }
        matches?.forEach(({ indices, value, key }) => {
          clonedItem[key as 'title' | 'url'] = highlightMatches(String(value), indices)
        })

        return clonedItem
      })
    }),
  })),
  withMethods((store, service = inject(BrowserService)) => ({
    getCurrentItem() {
      return store.results()[store.index()]
    },
    close() {
      service.close()
    },
    closeTab() {
      const item = this.getCurrentItem()

      if (!item || !item.actions.close) return

      item.actions.close()
      patchState(store, { items: store.items().filter((i) => i.id !== item.id) })
    },
    newTab() {
      if (store.searchEngine()) {
        service.search(store.query())
        patchState(store, { searchEngine: '' })
        this.close()
      }

      const item = this.getCurrentItem()

      if (!item || !item.actions.newTab) {
        service.searchInNewTab(store.query())
        return
      }

      item.actions.newTab()
      this.close()
    },
    select() {
      if (store.searchEngine()) {
        service.search(store.query())
        patchState(store, { searchEngine: '' })
        this.close()
      }

      const item = this.getCurrentItem()

      if (!item || !item.actions.select) {
        service.search(store.query())
        return
      }

      item.actions.select()
      this.close()
    },
    setQuery(query: string) {
      patchState(store, { query, index: store.withInitialSelection() ? 0 : -1 })
    },
    setInitialSelection(active: boolean) {
      patchState(store, { withInitialSelection: active, index: 0 })
    },
    setIndex(index: number) {
      if (store.index() + index < 0) {
        patchState(store, { index: store.results().length - 1 })
        return
      }

      if (store.index() + index >= store.results().length) {
        patchState(store, { index: 0 })
        return
      }

      patchState(store, (state) => ({
        index: state.index + index,
      }))
    },
    setSearchEngine(searchEngine: string) {
      patchState(store, { searchEngine, query: '' })
    },
  })),
  withMethods((store, service = inject(BrowserService)) => ({
    load: rxMethod<QuakVimItemType>(
      pipe(
        switchMap((action) =>
          service.load(action).pipe(
            tapResponse({
              next: (items) => patchState(store, { items }),
              error: console.error,
            }),
          ),
        ),
      ),
    ),
  })),
)