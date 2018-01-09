import { Direction, DirectionVector } from '~/types'

export function randomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function createDirectionVector(direction: Direction) {
  const vectors = {
    up: {
      x: -1,
      y: 0
    },
    down: {
      x: 1,
      y: 0
    },
    right: {
      x: 0,
      y: 1
    },
    left: {
      x: 0,
      y: -1
    }
  }
  const vector = vectors[direction]
  console.log('vect', vector, 'dir', direction)

  return vector
}
