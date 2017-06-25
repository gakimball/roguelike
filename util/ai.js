import { random } from 'lodash';

export default {
  wander: entity => {
    const dirs = ['up', 'down', 'left', 'right'];
    entity.move(dirs[random(1, 4)]);
  }
}
