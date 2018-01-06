import Vue from 'vue'

export interface Cell {
  x: number
  y: number
}

export class Board {
  size: number
  board: number[]
  constructor(size: number = 4) {
    this.size = size
    this.board = [...Array(size ** 2)].fill(0)
  }
  get(cell: Cell) {
    return this.board[cell.x * this.size + cell.y]
  }
  set(cell: Cell, value: number) {
    // without the set method, Vue cannot detect this change to the array
    Vue.set(this.board, cell.x * this.size + cell.y, value)
  }
  raw() {
    return this.board
  }
  reset() {
    this.board = [...Array(this.size ** 2)].fill(0)
  }
  // custom reduce function
  reduce(fn: Function, acc: any) {
    return this.board.reduce((ac, value, index) => {
      const cell = {
        x: Math.floor(index / this.size),
        y: index % this.size
      }
      return fn(ac, value, cell)
    }, acc)
  }
}
