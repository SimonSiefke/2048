import Vue from 'vue'
import Vuex from 'vuex'
import { Board } from '~/Board'
import { State, Cell, Direction, DirectionVector } from '~/types'
import { createDirectionVector } from '~/helpers'

Vue.use(Vuex)

const vectors = {
  up: { x: 0, y: -1 }, // Up
  right: { x: 1, y: 0 }, // Right
  down: { x: 0, y: 1 }, // Down
  left: { x: -1, y: 0 } // Left
}

const state: State = {
  board: new Board(),
  score: {
    current: 0,
    best: 0
  }
}

const mutations = {
  resetBoard(state: State) {
    state.board.reset()
    Vue.set(state.score, 'current', 0)
  },
  updateCell(state: State, { cell, value }: { cell: Cell; value: number }) {
    state.board.setValue(cell, value)
  },
  deleteCell(state: State, cell: Cell) {
    state.board.setValue(cell, 0)
  },
  random(state: State) {
    // deprecated
    const newCell = state.board.randomEmptyCell()
    if (newCell) {
      state.board.setValue(newCell, 2)
    }
  },
  createNewRandomCell(state: State) {
    const newCell = state.board.randomEmptyCell()
    if (newCell) {
      state.board.setValue(newCell, 2)
    }
  },
  addToScore(state: State, value: number) {
    const newScore = state.score.current + value
    Vue.set(state.score, 'current', newScore)
    if (newScore > state.score.best) {
      Vue.set(state.score, 'best', newScore)
    }
  }
}

const actions = {
  moveCell(
    { state, commit }: { state: State; commit: Function },
    { fromCell, toCell }: { fromCell: Cell; toCell: Cell }
  ) {
    const newValue = state.board.getValue(fromCell)
    commit('deleteCell', fromCell)
    commit('updateCell', { cell: toCell, value: newValue })
  },
  mergeCells(
    { state, commit }: { state: State; commit: Function },
    { oldCell, newCell }: { oldCell: Cell; newCell: Cell }
  ) {
    const newValue = state.board.getValue(oldCell) * 2
    commit('deleteCell', oldCell)
    commit('updateCell', { cell: newCell, value: newValue })
  },
  // TODO split move function into smaller modules
  move(
    {
      state,
      dispatch,
      commit
    }: {
      state: State
      commit: Function
      dispatch: Function
    },
    direction: Direction
  ) {
    const directionVector = createDirectionVector(direction)

    const allCells = state.board.traverseCells(directionVector)

    for (let currentCell of allCells) {
      // the farthest cell to which the current cell can move into the given direction
      const farthestCell = state.board.farthestPosition(
        currentCell,
        directionVector
      )

      // keep track of which cells we have already merged, because each cell must only be merged at most once
      let mergedCells: Cell[] = []

      // if the current cell can move
      if (farthestCell) {
        // get the next cell in the given direction
        const next = state.board.nextCell(farthestCell, directionVector)

        // if the current cell can merge with the next one
        if (
          next &&
          state.board.getValue(next) === state.board.getValue(currentCell)
        ) {
          // if the next cell hasn't already merged with another cell
          if (
            !mergedCells.find(cell => cell.x === next.x && cell.y === next.y)
          ) {
            dispatch('mergeCells', { oldCell: currentCell, newCell: next })
            const newValue = state.board.getValue(next)
            commit('addToScore', newValue)
            mergedCells.push(next)
          }
          console.table(mergedCells)
          console.log('merge')
        } else {
          dispatch('moveCell', { fromCell: currentCell, toCell: farthestCell })
        }
      }
    }
    commit('createNewRandomCell')
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
