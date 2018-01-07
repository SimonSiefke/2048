import Vue from 'vue'
import Vuex from 'vuex'
import { Board, Cell } from './board'

Vue.use(Vuex)

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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
