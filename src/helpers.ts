import { Board, Cell } from './board'

function randomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function emptyCells(board: Board) {
  return board.reduce(
    (fields: any, value: number, cell: Cell) =>
      value ? fields : fields.concat(cell),
    []
  )
}

export function randomEmptyCell(board: Board) {
  const emptyCellsIndices = emptyCells(board)
  if (emptyCellsIndices.length > 0) {
    const index = randomIntBetween(0, emptyCellsIndices.length - 1)
    return emptyCellsIndices[index]
  }
  return null
}
