import { QuakVimItemType } from '../models/quak-vim-item.type'

export function isValidQuakVimPanelType(value: string | null): value is QuakVimItemType {
  const actions: QuakVimItemType[] = ['tabs', 'bookmarks', 'history']
  return actions.includes(value as QuakVimItemType)
}
