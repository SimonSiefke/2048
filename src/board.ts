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
  _convertIndexToCell(index: number) {
    return {
      x: Math.floor(index / this.size),
      y: index % this.size
    }
  }
  _convertCellToIndex(cell: Cell) {
    return cell.x * this.size + cell.y
  }
  // custom reduce function
  _reduce(fn: Function, acc: any) {
    return this.board.reduce((ac, value, index) => {
      const cell = this._convertIndexToCell(index)
      return fn(ac, value, cell)
    }, acc)
  }

  get(cell: Cell) {
    return this.board[this._convertCellToIndex(cell)]
  }
  set(cell: Cell, value: number) {
    // without the set method, Vue cannot detect this change to the array
    Vue.set(this.board, cell.x * this.size + cell.y, value)
  }
  // keys() {
  //   return this.board.map(x => this.convertToCell(x))
  // }
  values() {
    return this.board
  }

  reset() {
    this.board = [...Array(this.size ** 2)].fill(0)
  }
  // findFarthestPosition(cell: Cell, direction: string) {
  //   // let previousCell = cell
  //   // do{
  //   // } while()
  // }
}
