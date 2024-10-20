import { Command } from './command.model'
import { SearchEngine } from './search-engine.model'

export interface Settings {
  theme: string
  searchEngines: SearchEngine[]
  commands: Command[]
}
