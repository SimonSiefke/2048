export enum Direction {
  'up',
  'down',
  'left',
  'right'
}

export interface DirectionVector {
  x: number
  y: number
}

export interface Cell {
  x: number
  y: number
}
