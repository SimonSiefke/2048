import Vue from 'vue'
import Vuex from 'vuex'
import { Board } from '~/Board'
import { Cell } from '~/types'

Vue.use(Vuex)

const vectors = {
  up: { x: 0, y: -1 }, // Up
  right: { x: 1, y: 0 }, // Right
  down: { x: 0, y: 1 }, // Down
  left: { x: -1, y: 0 } // Left
}

interface State {
  board: Board
}

const state: State = {
  board: new Board()
}

const mutations = {
  resetBoard(state: State) {
    state.board.reset()
  },
  updateCell(state: State, { cell, value }: { cell: Cell; value: number }) {
    state.board.setValue(cell, value)
  },
  deleteCell(state: State, cell: Cell) {
    state.board.setValue(cell, 0)
  },
  random(state: State) {
    const newCell = state.board.randomEmptyCell()
    if (newCell) {
      state.board.setValue(newCell, 2)
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
  move({
    state,
    dispatch,
    commit
  }: {
    state: State
    commit: Function
    dispatch: Function
  }) {
    const currentCell = { x: 0, y: 0 }
    commit('updateCell', { cell: currentCell, value: 2 })

    const x = 0
    const direction = {
      x: 0,
      y: 1
    }

    // the farthest cell to which the current cell can move into the given direction
    const farthestCell = state.board.farthestPosition(currentCell, direction)

    // if the current cell can move
    if (farthestCell) {
      console.table(farthestCell)
      // get the next cell in the given direction
      const next = state.board.nextCell(farthestCell, direction)

      // if the current cell can merge with the next one
      if (
        next &&
        state.board.getValue(next) === state.board.getValue(currentCell)
      ) {
        dispatch('mergeCells', { oldCell: currentCell, newCell: next })
        console.log('merge')
      } else {
        dispatch('moveCell', { fromCell: currentCell, toCell: farthestCell })
      }
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
