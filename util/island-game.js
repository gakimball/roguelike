import rot from 'rot-js';
import { autorun } from 'mobx';
import WorldStore from '../stores/world';
import Logger from './logger';
import { presets, createIsland } from './create-island';

export default class Game {
  constructor() {
    this.display = new rot.Display({
      width: 30,
      height: 30,
      fontSize: 16,
      forceSquareRatio: true
    });
    this.world = new WorldStore();
    this.logger = new Logger();
    this.cameraX = 0;
    this.cameraY = 0;
    this.cameraSize = 30;
    this.setup();
    this.setInitialCamera();
  }

  // @TODO: Replace with something more declarative
  setup() {
    this.map = createIsland(presets.giant);
    this.world.addEntity('player', 100, 100);
  }

  setInitialCamera() {
    for (let x = 0; x < (this.map.length / this.cameraSize); x++) {
      for (let y = 0; y < (this.map[0].length / this.cameraSize); y++) {
        if (this.entityVisible(this.world.player, x, y)) {
          this.cameraX = x;
          this.cameraY = y;
        }
      }
    }
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

  entityVisible(entity, xOffset = this.cameraX, yOffset = this.cameraY) {
    const lowerX = xOffset * this.cameraSize;
    const upperX = lowerX + this.cameraSize;
    const lowerY = yOffset * this.cameraSize;
    const upperY = lowerY + this.cameraSize;

    return (
      entity.x >= lowerX && entity.x < upperX &&
      entity.y >= lowerY && entity.y < upperY
    );
  }

  tick() {
    // Run entity AI
    this.world.entities.forEach(entity => entity.living && entity.tick());

    // Draw map
    for (let y = 0; y < this.cameraSize; y++) {
      for (let x = 0; x < this.cameraSize; x++) {
        const mapX = this.cameraX * this.cameraSize + x;
        const mapY = this.cameraY * this.cameraSize + y;
        this.display.draw(x, y, '', '', this.map[mapY][mapX]);
      }
    }

    // Draw entities
    this.world.entities.map(entity => {
      if (this.entityVisible(entity)) {
        const baseX = this.cameraX * this.cameraSize;
        const baseY = this.cameraY * this.cameraSize;
        this.display.draw(entity.x - baseX, entity.y - baseY, entity.character, '#000', this.map[entity.y][entity.x]);
      }
    });

    // Draw UI
    // this.display.drawText(26, 2, `HP  | ${this.world.player.health}`);
    // this.display.drawText(26, 3, `MP  | ${this.world.player.mana}`);
    // this.display.drawText(26, 4, `ATK | ${this.world.player.attack}`);
    //
    // // Draw logs
    // this.logger.getLogs().forEach((line, index) => {
    //   this.display.drawText(1, 18 + index, `> ${line}`);
    // });
  }
}
