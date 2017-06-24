import React, { Component } from 'react';
import rot from 'rot-js';
import { createIsland, tiles, presets } from '../util/create-island';

export default class Island extends Component {
  componentDidMount() {
    this.display = new rot.Display({
      width: presets.default.worldSize,
      height: presets.default.worldSize,
      fontSize: 8,
      forceSquareRatio: true
    });
    this.container.appendChild(this.display.getContainer());
    this.generate();
  }

  generate = () => {
    const map = createIsland(presets.default);

    for (let y = 0; y < presets.default.worldSize; y++) {
      for (let x = 0; x < presets.default.worldSize; x++) {
        this.display.draw(x, y, '', '#fff', map[y][x]);
      }
    }
  }

  render() {
    return (
      <div ref={e => { this.container = e; }}>
        <button onClick={this.generate}>Generate</button>
      </div>
    )
  }
}
