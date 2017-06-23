import { random } from 'lodash';

export default {
  wander: entity => {
    switch (random(1, 4)) {
      case 1:
        entity.moveUp();
        break;
      case 2:
        entity.moveDown();
        break;
      case 3:
        entity.moveLeft();
        break;
      default:
        entity.moveRight();
    }
  }
}
