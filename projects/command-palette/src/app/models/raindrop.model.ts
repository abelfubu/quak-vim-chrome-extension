export interface Raindrop {
  _id: number
  link: string
  title: string
  excerpt: string
  note: string
  type: string
  user: {
    $ref: string
    $id: number
  }
  cover: string
  media: unknown[]
  tags: unknown[]
  important: boolean
  reminder: {
    date: string | null
  }
  removed: boolean
  created: string
  collection: {
    $ref: string
    $id: number
    oid: number
  }
  highlights: unknown[]
  lastUpdate: string
  domain: string
  creatorRef: {
    _id: number
    avatar: string
    name: string
    email: string
  }
  sort: number
  collectionId: number
}
