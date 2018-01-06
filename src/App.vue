<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,regular,700" rel="stylesheet" />
    <!-- <h1>2048</h1> -->
    <section id="board">
      <div v-for="(element,index) of board.raw()" :key="index" :style="{'background-color': element ? '#eee4da':'rgba(238, 228, 218, 0.35)'}">
        <span>{{element }}</span>
      </div>
    </section>
    <!-- <button @click="resetBoard()">Reset</button>
    <button @click="updateBoardValue({cell:{x:0,y:0},value:10})">click</button>
    <button @click="random()">random</button> -->
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapActions, mapState } from 'vuex'

export default Vue.extend({
  name: 'app',
  methods: {
    ...mapMutations(['resetBoard', 'updateCell', 'random']),
    ...mapActions(['moveCell', 'mergeCells'])
  },
  computed: {
    ...mapState(['board', 'boardSize'])
  }
})
</script>

<style lang="stylus" scoped>
body
  font-family Roboto, Arial, Helvetica, sans-serif

#board
  $vertical-margin = 8vmin
  $gap = 3vmin
  background #bbada0
  display grid
  grid-gap $gap
  grid-template-columns repeat(4, 1fr)
  margin $vertical-margin auto
  padding $gap
  width 'calc(93vmin - 21px - 2*%s)' % $vertical-margin

  >div
    background #eee4da
    border-radius 5px
    cursor pointer
    position relative

    &:hover
      background lighten(@background, 10%)

    &::before
      content ''
      display block
      padding-top 100%

    >span
      color #776e65
      font-size 9vmin
      font-weight bold
      left 50%
      position absolute
      top 50%
      transform translate(-50%, -50%)
      user-select none
</style>
