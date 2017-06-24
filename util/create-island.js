import rot from 'rot-js';
import scaleValue from 'scale-value';

const scale = scaleValue(-1, 1, 0, 1);

const tiles = {
  water: 'rgb(84, 185, 235)',
  beach: 'rgb(212, 186, 95)',
  lowGrass: 'rgb(93, 194, 100)',
  highGrass: 'rgb(80, 170, 86)',
  lowMountain: 'rgb(139, 122, 79)',
  highMountain: 'rgb(110, 96, 63)',
  volcano: 'rgb(168, 38, 38)',
};

const presets = {
  default: {
    // Width and height of world
    worldSize: 150,
    // Density of noise sampled for map
    // Higher numbers create simpler terrain
    noiseDensity: 23,
    // Intensity of radial gradient that overlaps noise
    // Lower numbers prevent the islands from touching the edge of the map
    radialIntensity: 65,
  },
  tiny: {
    worldSize: 30,
    noiseDensity: 13,
    radialIntensity: 15,
  },
  giant: {
    worldSize: 300,
    noiseDensity: 30,
    radialIntensity: 150,
  },
};

export { tiles, presets };

export function createIsland(preset = presets.default) {
  const { worldSize, noiseDensity, radialIntensity } = preset;
  const noise = new rot.Noise.Simplex();
  const center = worldSize / 2;
  const map = [];

  for (let y = 0; y < worldSize; y++) {
    map[y] = [];

    for (let x = 0; x < worldSize; x++) {
      const distanceX = (center - x) ** 2;
      const distanceY = (center - y) ** 2;
      const distanceToCenter = Math.sqrt(distanceX + distanceY) / radialIntensity;
      const val = scale(noise.get(x / noiseDensity, y / noiseDensity)) - distanceToCenter;
      let tile;

      if (val < 0.05) {
        tile = tiles.water;
      } else if (val < 0.175) {
        tile = tiles.beach;
      } else if (val < 0.5) {
        tile = tiles.lowGrass;
      } else if (val < 0.7) {
        tile = tiles.highGrass;
      } else if (val < 0.8) {
        tile = tiles.lowMountain;
      } else if (val < 0.95) {
        tile = tiles.highMountain;
      } else {
        tile = tiles.volcano;
      }

      map[y][x] = tile;
    }
  }

  return map;
};
