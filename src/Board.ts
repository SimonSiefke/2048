import Vue from 'vue'
import { randomIntBetween } from './helpers'
import { Cell, Direction, DirectionVector } from './types'

// TODO make Board extend Array class
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
  _emptyCells() {
    return this.board.reduce(
      (acc: Cell[], value: number, index: number): Cell[] =>
        value ? acc : acc.concat(this._convertIndexToCell(index)),
      []
    )
  }
  randomEmptyCell() {
    const emptyCellsIndices = this._emptyCells()
    if (emptyCellsIndices.length > 0) {
      const index = randomIntBetween(0, emptyCellsIndices.length - 1)
      return emptyCellsIndices[index]
    }
    return null
  }

  getValue(cell: Cell) {
    return this.board[this._convertCellToIndex(cell)]
  }
  setValue(cell: Cell, value: number) {
    // without the set method, Vue cannot detect this change to the array
    Vue.set(this.board, this._convertCellToIndex(cell), value)
  }
  includesCell(cell: Cell) {
    return (
      0 <= cell.x && cell.x < this.size && 0 <= cell.y && cell.y < this.size
    )
  }
  isEmpty(cell: Cell) {
    return !this.getValue(cell)
  }
  farthestNonEmptyCell(startingCell: Cell, direction: any) {
    let current
    let next: Cell | null = { ...startingCell }
    do {
      current = next
      next = this.nextCell(next, direction)
    } while (next && this.isEmpty(next))
    return current
  }
  /** returns the farthest position the element can move to the given direction
   returns null if it can't move any further */
  farthestPosition(cell: Cell, direction: DirectionVector) {
    let next: Cell
    let nextnext: Cell | null = { ...cell }
    do {
      next = nextnext
      nextnext = this.nextCell(nextnext, direction)
    } while (nextnext && this.isEmpty(nextnext))
    return next
  }

  nextCell(cell: Cell, direction: DirectionVector) {
    const newCell = {
      x: cell.x + direction.x,
      y: cell.y + direction.y
    }
    if (this.includesCell(newCell)) {
      return newCell
    }
    return null
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
