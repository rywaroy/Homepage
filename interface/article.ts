
export interface IArticleList {
  rows: IArticle[]
  count: number
}

export interface IArticle {
  id: number
  title: string
  time: string
  content: string
  intro: string
  top: number
  watch: number
  state: number
  tagid: number
  tag: TTag
}

export interface TTag {
  title: string
  color: string
  state: number
}

export interface IComment {
  name: string
  content: string
  aid: number
  time: string
}