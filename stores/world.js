import { action, observable } from 'mobx';
import { find } from 'lodash';
import { presets, createIsland } from '../util/create-island';
import Entity from '../entities/entity';
import entities from '../entities/list';

export default class WorldStore {
  entities = []

  player = null

  constructor(game, mapPreset = presets.default) {
    this.game = game;
    this.map = createIsland(mapPreset);
  }

  addEntity(type, x, y) {
    const entity = entities[type];

    if (entity) {
      const e = new Entity(this.game, entity);
      e.place(x, y);
      this.entities.push(e);

      if (e.player) {
        this.player = e;
      }
    }
  }

  getEntityAt(x, y) {
    return _.find(this.entities, { x, y });
  }
}
