import Living from './living';

export default class Player extends Living {
  constructor(world) {
    super(world, '@');
  }
}
