import { assign, mixin, fromPairs } from 'lodash';
import ai from '../util/ai';
import { tiles } from '../util/create-island';

export default class Entity {
  x = null
  y = null

  constructor(game, props) {
    this.game = game;
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
    const tile = this.game.world.map[nextY][nextX];

    return [tiles.water, tiles.lowMountain, tiles.highMountain].indexOf(tile) === -1;
  }

  outOfBounds() {
    const cameraX = this.game.cameraX * this.game.cameraSize;
    const cameraY = this.game.cameraY * this.game.cameraSize;

    if (this.x < cameraX) {
      return 'left';
    }

    if (this.x >= cameraX + this.game.cameraSize) {
      return 'right';
    }

    if (this.y < cameraY) {
      return 'up';
    }

    if (this.y >= cameraY + this.game.cameraSize) {
      return 'down';
    }

    return false;
  }
}
