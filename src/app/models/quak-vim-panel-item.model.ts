import { QuakVimItemType } from './quak-vim-item.type'

export interface QuakVimPanelItem {
  active: boolean
  chromeFaviconUrl?: string
  favIconUrl: string
  id: number | string | undefined
  title: string
  type: QuakVimItemType
  url: string
  windowId?: number
  actions: {
    select?: () => Promise<unknown>
    close?: () => Promise<unknown>
    newTab?: () => Promise<unknown>
  }
}
