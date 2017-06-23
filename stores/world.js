import { action, observable } from 'mobx';
import createMap from '../util/create-map';
import { Player } from '../entities';

export default class WorldStore {
  map = createMap()

  entities = []

  player = null

  addEntity(Entity, x, y) {
    const e = new Entity(this);
    e.place(x, y);
    this.entities.push(e);

    if (e instanceof Player) {
      this.player = e;
    }
  }
}
