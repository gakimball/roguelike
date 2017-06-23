import { action, observable } from 'mobx';
import createMap from '../util/create-map';
import Entity from '../entities/entity';
import entities from '../entities/list';

export default class WorldStore {
  map = createMap()

  entities = []

  player = null

  addEntity(type, x, y) {
    const entity = entities[type];

    if (entity) {
      const e = new Entity(this, entity);
      e.place(x, y);
      this.entities.push(e);

      if (e.player) {
        this.player = e;
      }
    }
  }
}
