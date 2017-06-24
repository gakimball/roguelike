import React, { Component } from 'react';
import rot from 'rot-js';
import scaleValue from 'scale-value';

const scale = scaleValue(-1, 1, 0, 1);

// Width and height of world
const worldSize = 100;

// Density of noise sampled for map
// Higher numbers create simpler terrain
const noiseDensity = 23;

// Intensity of radial gradient that overlaps noise
// Lower numbers prevent the islands from touching the edge of the map
const radialIntensity = 65;

export default class Island extends Component {
  componentDidMount() {
    this.display = new rot.Display({
      width: worldSize,
      height: worldSize,
      fontSize: 8,
      forceSquareRatio: true
    });
    this.container.appendChild(this.display.getContainer());
    this.generate();
  }

  generate = () => {
    const noise = new rot.Noise.Simplex();
    const center = worldSize / 2;

    for (let x = 0; x < worldSize; x++) {
      for (let y = 0; y < worldSize; y++) {
        const distanceX = (center - x) ** 2;
        const distanceY = (center - y) ** 2;
        const distanceToCenter = Math.sqrt(distanceX + distanceY) / radialIntensity;
        const val = scale(noise.get(x / noiseDensity, y / noiseDensity)) - distanceToCenter;
        let color;

        if (val < 0.05) {
          color = 'rgb(84, 185, 235)'; // Water
        } else if (val < 0.175) {
          color = 'rgb(212, 186, 95)'; // Beach
        } else if (val < 0.5) {
          color = 'rgb(93, 194, 100)'; // Low grass
        } else if (val < 0.7) {
          color = 'rgb(80, 170, 86)'; // High grass
        } else if (val < 0.8) {
          color = 'rgb(139, 122, 79)'; // Low mountain
        } else if (val < 0.95) {
          color = 'rgb(110, 96, 63)'; // High mountain
        } else {
          color = 'rgb(168, 38, 38)'; // Volcano
        }

        this.display.draw(x, y, '', '#fff', color);
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
