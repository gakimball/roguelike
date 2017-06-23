import React, { Component } from 'react';
import DocumentEvents from 'react-document-events';
import rot from 'rot-js';
import { autorun } from 'mobx';
import WorldStore from '../stores/world';

export default class Game extends Component {
  world = new WorldStore()

  componentDidMount() {
    this.setupDisplay();
    this.setupWorld();
    this.tick();
  }

  setupDisplay() {
    this.display = new rot.Display({
      width: 48,
      height: 27,
      fontSize: 16,
      bg: '#333',
      fg: '#fff',
    });

    const canvas = this.display.getContainer();
    canvas.classList.add('game-container');

    this.container.appendChild(canvas);
  }

  setupWorld() {
    this.world.addEntity('player', 5, 5);
    this.world.addEntity('gremlin', 10, 10);
  }

  handleKey = (e) => {
    e.preventDefault();

    switch (e.key) {
      case 'ArrowUp':
        this.world.player.moveUp();
        this.tick();
        break;
      case 'ArrowDown':
        this.world.player.moveDown();
        this.tick();
        break;
      case 'ArrowLeft':
        this.world.player.moveLeft();
        this.tick();
        break;
      case 'ArrowRight':
        this.world.player.moveRight();
        this.tick();
        break;
      default:
    }
  }

  tick() {
    // Run entity AI
    this.world.entities.forEach(entity => entity.living && entity.tick());

    // Draw map
    this.world.map.create((x, y, wall) => {
      this.display.draw(x, y, wall ? '#' : '.');
    });

    // Draw entities
    this.world.entities.map(({ x, y, character }) => {
      this.display.draw(x, y, character);
    });
  }

  render() {
    return (
      <div className="container" ref={e => { this.container = e; }}>
        <DocumentEvents onKeyDown={this.handleKey} />
        <style jsx>{`
          .container {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }
}
