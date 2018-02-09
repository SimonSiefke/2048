<template>
  <main id="app">
    <!-- TODO local font instead of link -->
    <link rel="stylesheet" type="text/css" media="screen" href="css/clear-sans.css">
    <header>
      <h1>2048</h1>
      <div class="score">
        <span class="title">Score</span>
        <br>
        <span class="value">{{score.current}}</span>
      </div>
      <div class="score">
        <span class="title">Best</span>
        <br>
        <span class="value">{{score.best}}</span>
      </div>
      <h2>Join the numbers and get to the
        <b>2048 tile!</b>
      </h2>
      <button class="new-game" @click="resetBoard()">New Game</button>
    </header>
    <section id="board">
      <div v-for="(element,index) of board.values()" :key="index" :class="`value-${element}`">
        <span>{{element || ''}}</span>
      </div>
    </section>
  </main>
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
    ...mapMutations(['resetBoard']),
    ...mapActions(['move']),
  },
  computed: {
    ...mapState(['board', 'score']),
  },
})
</script>

<style lang="stylus" scoped>
// Variables
$vertical-margin = 8vmin;

// Begin Style
main {
  margin: $vertical-margin;
}

header {
  display: grid;
  // justify-items: center;
  // align-content: end;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 5px;

  h1 {
    grid-column: span 2; // span two columns
    margin: 0;
  }

  .score {
    slightly-round();
    // background: plum;
    // display: flex;
    color: #ffffff;
    background: #bbada0;

    .title, .value {
    }

    .title {
      text-transform: uppercase;
    }

    .value {
      font-size: 200%;
    }
  }

  h2 {
    grid-column: span 3;
  }

  .new-game {
    slightly-round();
    background: #8f7a66;
    color: #ffffff;
  }
}

// TODO animations
#board {
  $gap = 3vmin;
  box-sizing: border-box; // make padding part of the box-content
  background: $colors.boardBackground;
  display: grid;
  grid-gap: $gap;
  grid-template-columns: repeat(4, 1fr);
  // margin: $vertical-margin auto;
  padding: $gap;
  width: 100%;
  border-radius: 8px;

  >div {
    slightly-round();
    position: relative;

    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    >span {
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
