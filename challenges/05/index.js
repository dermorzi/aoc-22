const path = require('path');
const { readFile } = require('node:fs/promises');

// input loading
async function loadInput() {
  try {
    const inputPath = path.resolve(__dirname, 'input.txt');
    const input = await readFile(inputPath, { encoding: 'utf8' });
    return input.split('\n\n');
  } catch (error) {
    console.log(error);
  }
}

// data preparing
function getStacks(input) {
  const stacks = {};
  const data = input.split('\n');
  const raw = data.map(str => {
    const row = [];
    const width = 4;

    for (let offset = 0; offset < str.length; offset += width) {
      const sub = str.substring(offset, offset + width).trim();

      if (sub && sub.length > 1) row.push(sub.split('')[1]);
      else if (sub && sub.length === 1) row.push(parseInt(sub));
      else row.push(0);
    }

    return row;
  }).reverse();

  const [numbers, ...crates] = raw;

  numbers.forEach(num => stacks[num] = []);

  for (let row of crates) {
    row.forEach((crate, index) => {
      if (crate !== 0) {
        stacks[index + 1].push(crate);
      }
    });
  }

  return stacks;
}

function getMoves(input) {
  const instructions = input.split('\n');
  const data = instructions.map(line => {
    const raw = line.split(' ');
    const parsed = {};

    for (let i = 0, j = raw.length; i < j; i += 2) {
      const key = raw[i];
      const value = raw[i + 1];

      parsed[key] = parseInt(value);
    }

    return parsed;
  });

  return data;
}

async function prepareData() {
  try {
    const [stacksInput, movesInput] = await loadInput();
    const stacks = getStacks(stacksInput);
    const moves = getMoves(movesInput);

    return [stacks, moves];
  } catch (error) {
    console.error(error);
  }
}

// movement variants
function performSingleMoves(movement, stacks) {
  const { move, from, to } = movement;

  for (let i = 0; i < move; i++) {
    const crate = stacks[from].pop();
    stacks[to].push(crate);
  }
}

function performMultiMoves(movement, stacks) {
  const { move, from, to } = movement;
  const stackSize = stacks[from].length;
  const subStack = stacks[from].splice(stackSize - move);
  stacks[to] = [...stacks[to], ...subStack];
}

// solutions
async function partOne() {
  const [stacks, moves] = await prepareData();
  let topCrates = '';

  moves.forEach(movement => performSingleMoves(movement, stacks));

  for (let stack of Object.values(stacks)) {
    topCrates += stack[stack.length - 1];
  }

  return topCrates;
}

async function partTwo() {
  const [stacks, moves] = await prepareData();
  let topCrates = '';

  moves.forEach(movement => performMultiMoves(movement, stacks));

  for (let stack of Object.values(stacks)) {
    topCrates += stack[stack.length - 1];
  }

  return topCrates;
}

module.exports = [partOne, partTwo];
