<template>
  <div id="app">
    <link rel="stylesheet" type="text/css" media="screen" href="css/clear-sans.css">

    <section id="board">
      <div v-for="(element,index) of board.values()" :key="index" :class="`value-${element}`">
        <span>{{element }}</span>
      </div>
    </section>
    <button @click="resetBoard()">Reset</button>
    <button @click="random()">random</button>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapActions, mapState } from 'vuex'

export default Vue.extend({
  name: 'app',
  mounted() {
    window.addEventListener('keyup', e => {
      switch (e.keyCode) {
        case 37: // left arrow
          this.move('left')
          break
        case 38: // up arrow
          this.move('up')
          break
        case 39: // right arrow
          this.move('right')
          break
        case 40: // down arrow
          this.move('down')
          break
      }
    })
  },
  methods: {
    ...mapMutations(['resetBoard', 'random']),
    ...mapActions(['move'])
  },
  computed: {
    ...mapState(['board'])
  }
})
</script>

<style lang="stylus" scoped>
// Read the colors from the colors.json file
$mainFont = 'Clear Sans', Arial, Helvetica, sans-serif;

#board {
  $vertical-margin = 8vmin;
  $gap = 3vmin;
  background: $colors.boardBackground;
  display: grid;
  grid-gap: $gap;
  grid-template-columns: repeat(4, 1fr);
  margin: $vertical-margin auto;
  padding: $gap;
  width: 'calc(93vmin - 21px - 2*%s)' % $vertical-margin;

  >div {
    border-radius: 5px;
    position: relative;

    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    >span {
      font-family: $mainFont;
      font-size: 9vmin;
      font-weight: bold;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      user-select: none;
    }
  }
}

// apply the colors for each value: 2, 4, 8...
backgroundColors = $colors.backgroundColors;
foregroundColors = $colors.foregroundColors;

for value, bg in backgroundColors {
  backgroundColor = bg[0];
  isDark = bg[1];

  .value-{value} {
    background: backgroundColor;

    if (isDark) {
      color: foregroundColors['light'];
    } else {
      color: foregroundColors['dark'];
    }
  }
}
</style>
