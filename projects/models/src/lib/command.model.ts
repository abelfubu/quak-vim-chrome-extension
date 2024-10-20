import { Shortcut } from './shortcut.model'

export interface Command {
  shortcut: Shortcut
  description: string
}
