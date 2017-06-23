import rot from 'rot-js';
import { autorun } from 'mobx';
import WorldStore from '../stores/world';
import Logger from './logger';

export default class Game {
  constructor() {
    this.display = new rot.Display({
      width: 48,
      height: 27,
      fontSize: 16,
      bg: '#333',
      fg: '#fff',
    });
    this.world = new WorldStore();
    this.logger = new Logger();
    this.setup();
  }

  // @TODO: Replace with something more declarative
  setup() {
    this.world.addEntity('player', 5, 5);
    this.world.addEntity('gremlin', 10, 10);
  }

  getCanvas() {
    const canvas = this.display.getContainer();
    canvas.classList.add('game-container');
    return canvas;
  }

  handleKey = (e) => {
    const tick = () => {
      e.preventDefault();
      this.tick();
    };

    switch (e.key) {
      case 'ArrowUp':
        this.world.player.moveUp();
        tick();
        break;
      case 'ArrowDown':
        this.world.player.moveDown();
        tick();
        break;
      case 'ArrowLeft':
        this.world.player.moveLeft();
        tick();
        break;
      case 'ArrowRight':
        this.world.player.moveRight();
        tick();
        break;
      default:
    }
  }

  start() {
    this.logger.log('Ye findeth yeself in yon dungeon.');
    this.tick();
  }

  tick() {
    // Run entity AI
    this.world.entities.forEach(entity => entity.living && entity.tick());

    // Draw map
    this.world.map.create((x, y, wall) => {
      this.display.draw(x + 1, y + 1, wall ? '#' : '.');
    });

    // Draw entities
    this.world.entities.map(({ x, y, character }) => {
      this.display.draw(x + 1, y + 1, character);
    });

    // Draw UI
    this.display.drawText(26, 2, `HP  | ${this.world.player.health}`);
    this.display.drawText(26, 3, `MP  | ${this.world.player.mana}`);
    this.display.drawText(26, 4, `ATK | ${this.world.player.attack}`);

    // Draw logs
    this.logger.getLogs().forEach((line, index) => {
      this.display.drawText(1, 18 + index, `> ${line}`);
    });
  }
}
