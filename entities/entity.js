import { assign, mixin, fromPairs } from 'lodash';
import rot from 'rot-js';
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

  get dead() {
    return this.health === 0;
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

  move(dir) {
    let nextX = this.x;
    let nextY = this.y;

    switch (dir) {
      case 'up':
        nextY--;
        break;
      case 'down':
        nextY++;
        break;
      case 'left':
        nextX--;
        break;
      case 'right':
        nextX++;
        break;
      default:
    }

    const target = this.getSpace(nextX, nextY);

    if (target instanceof Entity) {
      if (this.player) {
        this.damage(target);
      }
    } else if (target === true) {
      this.x = nextX;
      this.y = nextY;
    }
  }

  getSpace(nextX, nextY) {
    const tile = this.game.world.map[nextY][nextX];
    const walkable = [tiles.water, tiles.lowMountain, tiles.highMountain].indexOf(tile) === -1;
    const entity = this.game.world.getEntityAt(nextX, nextY);

    if (entity) {
      return entity;
    }

    return walkable;
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

  damage(target) {
    let accuracy;

    if (target.dead) {
      this.game.logger.log(`That ${target.name} is dead.`);
      return;
    }

    if (this.player) {
      accuracy = 0.9 + ((this.level - target.level) * 0.05);
    } else {
      accuracy = 0.5 + ((this.level - target.level) * 0.1);
    }

    accuracy = Math.min(1, accuracy);

    if (rot.RNG.getUniform() < accuracy) {
      const damage = this.attack - (target.defense || 0);
      this.game.logger.log(`${this.player ? 'You attack' : `${this.name} attacks`} ${this.player ? target.name : 'you'} for ${damage} damage.`);
      target.hurt(damage);
    } else {
      this.game.logger.log(`${this.player ? 'You miss' : `${this.name} misses`} ${this.player ? target.name : 'you'}.`);
    }
  }

  hurt(damage) {
    this.health = this.health - damage;

    if (this.health <= 0) {
      this.health = 0;
    }
  }
}
