const path = require('node:path');
const { readFileSync } = require('node:fs');

function findPosition(letter, grid) {
  for (let y = 0, height = grid.length; y < height; y++) {
    for (let x = 0, width = grid[y].length; x < width; x++) {
      if (grid[y][x] === letter) {
        return [x, y];
      }
    }
  }
}

function loadInput(filename) {
  try {
    const heightMap = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const resolveLevel = (level) => (level === 'S' || level === 'E') ? level : heightMap.indexOf(level);
    const filepath = path.resolve(__dirname, filename);
    const input = readFileSync(filepath, { encoding: 'utf8' });
    const grid = input.split('\n').map(line => line.split('').map(resolveLevel));
    const start = findPosition('S', grid);
    const end = findPosition('E', grid);
    return [grid, start, end];
  } catch (error) {
    console.log(error);
  }
}

const SAMPLE = loadInput('sample.txt');
const INPUT = loadInput('input.txt');

module.exports = [
  () => {
  },
  () => {
  }
]
