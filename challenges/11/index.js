const path = require('node:path');
const { readFileSync } = require('node:fs');

function loadInput(filename) {
  try {
    const input = readFileSync(path.resolve(__dirname, filename), { encoding: 'utf8' });
    return input;
  } catch (error) {
    console.error(error);
  }
}

const input = loadInput('input.txt');

module.exports = [() => null, () => null];
