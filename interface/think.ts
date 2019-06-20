export interface IThink {
  avatar: string
  name: string
  content: string
  photos: any
  state: number
  id: number
}

export interface IThinkList {
  rows: IThink[]
  count: number
}