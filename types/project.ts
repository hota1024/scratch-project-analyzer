export type APIProject = {
  id: number
  title: string
  description: string
  instructions: string
  author: {
    id: number
  }
  image: string
  history: {
    created: string
    modified: string
    shared: string
  }
  stats: {
    views: number
    loves: number
    favorites: number
    comments: number
  }
}
