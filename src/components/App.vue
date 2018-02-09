<template>
  <main id="app">
    <!-- TODO local font instead of link -->
    <link rel="stylesheet" type="text/css" media="screen" href="css/clear-sans.css">
    <header>
      <h1>2048</h1>
      <div class="score-container">
        <div class="score">
          <span class="title">Score</span>
          <span class="value">{{score.current}}</span>
        </div>
        <div class="score">
          <span class="title">Best</span>
          <span class="value">{{score.best}}</span>
        </div>
      </div>
      <h2>Join the numbers and get to the
        <strong>2048 tile!</strong>
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
// variables
font-range = 300px 1000px;
$header-gap = 1rem;
$max-border-thickness = 1rem; // todo implement

main {
  margin: auto;
  max-width: 33rem;
}

header {
  align-items: center;
  display: grid;
  grid-column-gap: $header-gap;
  grid-row-gap: $header-gap;
  grid-template-columns: 1fr auto;
  margin-bottom: $header-gap;

  h1 {
    font-range;
    font-size: responsive 2.5rem 7rem;
  }

  .score-container {
    display: flex;
  }

  .score {
    slightly-round();
    align-items: center;
    background: #bbada0;
    color: #fff;
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 3.5rem;

    // width: 3.5rem;
    &:first-of-type {
      margin-right: 0.3rem;
    }

    .title {
      font-size: 0.65rem;
      margin-top: 0.4rem;
      text-transform: uppercase;
    }

    .value {
      font-size: 1.4rem;
      font-weight: 600;
      margin: 0 0.5rem 0.15rem 0.5rem;
    }
  }

  h2 {
    font-range;
    font-size: responsive 1rem 1.5rem;
    font-weight: normal;
  }

  .new-game {
    slightly-round();
    background: #8f7a66;
    color: #ffffff;
    padding: 0.7rem 0;
  }
}

// TODO animations
#board {
  $gap = 3vmin;
  background: $colors.boardBackground;
  border-radius: 8px;
  box-sizing: border-box; // make padding part of the box-content
  display: grid;
  grid-gap: $gap;
  grid-template-columns: repeat(4, 1fr);
  padding: $gap;
  width: 100vmin - $gap * 2 -$vertical-margin;

  >div {
    slightly-round();
    position: relative;

    // create square
    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    >span {
      font-range: 250px 800px;
      font-size: responsive 1.2rem 2.9rem;
      font-weight: bold;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%); // center the numbers inside sqaure
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
