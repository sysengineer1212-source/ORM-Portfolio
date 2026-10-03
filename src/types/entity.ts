export type EntityNodeType =
  | 'Primary Entity'
  | 'Owned Property'
  | 'Web 2.0'
  | 'Social'
  | 'Authority Article'

export interface EntityNode {
  id: string
  label: string
  platform: string
  type: EntityNodeType
  status: 'Active' | 'Review'
  health: number
  x: number
  y: number
}

export interface EntityConnection {
  source: string
  target: string
  relation: string
}