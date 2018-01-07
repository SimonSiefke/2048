import Vue from 'vue'
import Vuex from 'vuex'
import { Board } from '~/board'
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
    state.board.set(cell, value)
  },
  deleteCell(state: State, cell: Cell) {
    state.board.set(cell, 0)
  },
  random(state: State) {
    const newCell = state.board.randomEmptyCell()
    if (newCell) {
      state.board.set(newCell, 2)
    }
  }
}

const actions = {
  moveCell(
    { state, commit }: { state: State; commit: Function },
    { fromCell, toCell }: { fromCell: Cell; toCell: Cell }
  ) {
    const newValue = state.board.get(fromCell)
    commit('deleteCell', fromCell)
    commit('updateCell', { cell: toCell, newValue })
  },
  mergeCells(
    { state, commit }: { state: State; commit: Function },
    {
      oldCell1,
      oldCell2,
      newCell
    }: { oldCell1: Cell; oldCell2: Cell; newCell: Cell }
  ) {
    const newValue = state.board.get(oldCell1) * 2
    commit('deleteCell', oldCell1)
    commit('deleteCell', oldCell2)
    commit('updateCell', newCell, newValue)
  },
  move({ state, commit }: { state: State; commit: Function }) {
    const c = { x: 0, y: 2 }
    commit('updateCell', { cell: c, value: 2 })

    const x = 0
    const direction = {
      x: 0,
      y: 1
    }
    const next = state.board.nextCell(c, direction)
    if (next && state.board.get(next) === state.board.get(c)) {
      console.log('merge')
    }

    console.table(state.board.farthestPosition(c, direction))
    // for (let y = state.board.size; y >= 0; y--) {
    //   // const next = state.board.n
    // }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
