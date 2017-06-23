import { assign, mixin, fromPairs } from 'lodash';
import ai from '../util/ai';

export default class Entity {
  x = null
  y = null

  constructor(world, props) {
    this.world = world;
    assign(this, props, fromPairs(props.flags.map(f => [f, true])));
    delete this.flags;

    if (this.ai && this.ai in ai) {
      this.ai = ai[this.ai];
    } else {
      this.ai = null;
    }
  }

  place(x, y) {
    this.x = x;
    this.y = y;
  }

  tick() {
    if (this.ai) {
      this.ai(this);
    }
  }

  moveUp() {
    const nextY = this.y - 1;

    if (this.freeSpace(this.x, nextY)) {
      this.y = nextY;
    }
  }

  moveDown() {
    const nextY = this.y + 1;

    if (this.freeSpace(this.x, nextY)) {
      this.y = nextY;
    }
  }

  moveLeft() {
    const nextX = this.x - 1;

    if (this.freeSpace(nextX, this.y)) {
      this.x = nextX;
    }
  }

  moveRight() {
    const nextX = this.x + 1;

    if (this.freeSpace(nextX, this.y)) {
      this.x = nextX;
    }
  }

  freeSpace(nextX, nextY) {
    let free = true;

    this.world.map.create((x, y, wall) => {
      if (x === nextX && y === nextY && wall) {
        free = false;
      }
    });

    this.world.entities.map(({ x, y }) => {
      if (x === nextX && y === nextY) {
        free = false;
      }
    });

    return free;
  }
}
