export interface IList {
  id: number
  title: string
  intro: string
  tag: string
}

export interface ICount {
  rows: IList[]
  count: number
}

export interface IInfo {
  id: number
  title: string
  update: string
  intro: string
  state: number
  md: string
  html: string
  tag: string
  type: number
}