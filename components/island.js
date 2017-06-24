import React, { Component } from 'react';
import rot from 'rot-js';
import scaleValue from 'scale-value';

const scale = scaleValue(-1, 1, 0, 1);

export default class Island extends Component {
  componentDidMount() {
    const display = new rot.Display({
      width: 50,
      height: 50,
      fontSize: 8,
      forceSquareRatio: true
    });
    const noise = new rot.Noise.Simplex();
    const center = 24;

    this.container.appendChild(display.getContainer());

    for (let x = 0; x < 50; x++) {
      for (let y = 0; y < 50; y++) {
        const distanceX = (center - x) ** 2;
        const distanceY = (center - y) ** 2;
        const distanceToCenter = Math.sqrt(distanceX + distanceY) / 25;
        const val = scale(noise.get(x / 25, y / 25)) - distanceToCenter;
        let color;

        if (val < 0.1) {
          color = 'rgb(84, 185, 235)'; // Water
        } else if (val < 0.2) {
          color = 'rgb(212, 186, 95)'; // Beach
        } else if (val < 0.3) {
          color = 'rgb(80, 170, 86)'; // Low grass
        } else if (val < 0.5) {
          color = 'rgb(59, 125, 63)'; // High grass
        } else if (val < 0.7) {
          color = 'rgb(139, 122, 79)'; // Low mountain
        } else if (val < 0.99) {
          color = 'rgb(110, 96, 63)'; // High mountain
        } else {
          color = 'rgb(168, 38, 38)'; // Volcano
        }

        display.draw(x, y, '', '#fff', color);
      }
    }
  }

  generate = () => {

  }

  render() {
    return (
      <div ref={e => { this.container = e; }}>
        <button onClick={this.generate}>Generate</button>
      </div>
    )
  }
}
