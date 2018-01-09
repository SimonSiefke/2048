<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,regular,700" rel="stylesheet" />
    <!-- <h1>2048</h1> -->
    <section id="board">
      <div v-for="(element,index) of board.values()" :key="index" :class="`value-${element}`">
        <span>{{element }}</span>
      </div>
    </section>
    <button @click="resetBoard()">Reset</button>
    <button @click="random()">random</button>
    <button @click="move('right')">move</button>
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
body {
  font-family: Roboto, Arial, Helvetica, sans-serif;
}

#board {
  $vertical-margin = 8vmin;
  $gap = 3vmin;
  background: #bbada0;
  display: grid;
  grid-gap: $gap;
  grid-template-columns: repeat(4, 1fr);
  margin: $vertical-margin auto;
  padding: $gap;
  width: 'calc(93vmin - 21px - 2*%s)' % $vertical-margin;

  >div {
    // background: #eee4da;
    border-radius: 5px;
    // cursor pointer
    position: relative;

    &:hover {
      background: lighten(@background, 10%);
    }

    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    >span {
      color: #776e65;
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

// Read the colors from the colors.json file and apply them
colors = json('colors.json', { hash: true });
backgroundColors = colors.backgroundColors;
foregroundColors = colors.foregroundColors;

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
