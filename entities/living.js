import Entity from './entity';

export default class Living extends Entity {
  living = true

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
