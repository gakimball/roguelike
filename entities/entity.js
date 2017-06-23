export default class Entity {
  x = null
  y = null

  constructor(world, char) {
    this.world = world;
    this.char = char;
  }

  place(x, y) {
    this.x = x;
    this.y = y;
  }
}
