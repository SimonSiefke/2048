import { Board } from '~/Board'
export type Direction = 'up' | 'down' | 'left' | 'right'

export interface DirectionVector {
  x: number
  y: number
}

export interface Cell {
  x: number
  y: number
}

interface Score {
  current: number
  best: number
}

export interface State {
  board: Board
  score: Score
}
