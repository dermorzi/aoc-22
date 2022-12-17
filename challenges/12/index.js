const path = require('node:path');
const { readFileSync } = require('node:fs');
const Walker = require('./walker.js');

const HEIGHTS = 'abcdefghijklmnopqrstuvwxyz'.split('');

function findPosition(letter, grid) {
  for (let y = 0, height = grid.length; y < height; y++) {
    for (let x = 0, width = grid[y].length; x < width; x++) {
      if (grid[y][x] === letter) {
        grid[y][x] = (letter === 'S') ? HEIGHTS.indexOf('a') : HEIGHTS.indexOf('z');
        return [x, y];
      }
    }
  }
}

function loadInput(filename) {
  try {
    const resolveLevel = (level) => (level === 'S' || level === 'E') ? level : HEIGHTS.indexOf(level);
    const filepath = path.resolve(__dirname, filename);
    const input = readFileSync(filepath, { encoding: 'utf8' });
    const grid = input.split('\n').map(line => [...line].map(resolveLevel));
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
    const [grid, start, end] = INPUT;
    const walker = new Walker(grid, start, end);
    const pathLength = walker.findPath();
    return pathLength;
  },
  () => {
  }
]
