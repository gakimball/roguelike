import Living from './living';
import ai from '../util/ai';

export default class Gremlin extends Living {
  constructor(world) {
    super(world, '#');

    this.ai = ai.wander;
  }
}
