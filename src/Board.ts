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
  /**
   * returns the next cell to the given direction or null if there isn't any
   */
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
  // cells() {
  //   return this.board.map((_, index) => this._convertIndexToCell(index))
  // }
  values() {
    return this.board
  }

  reset() {
    this.board = [...Array(this.size ** 2)].fill(0)
  }

  traverseCells(directionVector: DirectionVector) {
    let cells = this.board.map((_, index) => this._convertIndexToCell(index))
    /* we need to sort the cells in order to compute the right move,
     so that [0 2 2 2] does not become [0 0 4 2]. */

    // if we want to move up, we must start traversing from the top
    if (directionVector.x === 1) {
      cells = cells.sort((cell1, cell2) => cell2.x - cell1.x)
    } else if (directionVector.y === 1) {
      // if we want to move right, we must start traversing from the right
      cells = cells.sort((cell1, cell2) => cell2.y - cell1.y)
    }
    return cells
  }
}
