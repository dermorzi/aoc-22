const { readFile } = require('node:fs/promises');
const path = require('path');

async function loadInput() {
  try {
    const fileContent = await readFile(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' });
    const inputStrings = fileContent.split('\n');
    const input = inputStrings.map(str => {
      const [opponentChoice, _, myChoice] = str.split('');
      return [opponentChoice, myChoice];
    })
    return input;
  } catch (err) {
    console.log(err);
  }
}

const OPTIONS = [
  { name: 'rock', beats: 'scissor', points: 1 },
  { name: 'paper', beats: 'rock', points: 2 },
  { name: 'scissor', beats: 'paper', points: 3 },
];

const RESULT_POINTS = { loss: 0, draw: 3, win: 6 };

function getPoints(choice, result) {
  return choice.points + RESULT_POINTS[result];
}

function getResult(a, b) {
  if (a.name === b.name) return 'draw';
  if (a.beats === b.name) return 'loss';
  return 'win';
}

function getRealChoice(choice, names) {
  return OPTIONS.find(o => o.name === names[choice]);
}

// solution part one
async function partOne() {
  const input = await loadInput();
  const opponentNames = { A: 'rock', B: 'paper', C: 'scissor' };
  const myNames = { X: 'rock', Y: 'paper', Z: 'scissor' };
  let score = 0;

  // oc is the opponent choice and mc my choices from the input
  for (let [oc, mc] of input) {
    const opponentChoice = getRealChoice(oc, opponentNames);
    const myChoice = getRealChoice(mc, myNames);
    const result = getResult(opponentChoice, myChoice);
    const points = getPoints(myChoice, result);
    score += points;
  }

  return score + ' points';
}

// solution part two
async function partTwo() {
  const input = await loadInput();
  const names = { A: 'rock', B: 'paper', C: 'scissor' };
  const results = { X: 'loss', Y: 'draw', Z: 'win' };

  const getMyChoice = (opponentChoice, result) => {
    if (result === 'draw') return OPTIONS.find(o => o.name === opponentChoice.name);
    if (result === 'loss') return OPTIONS.find(o => o.name === opponentChoice.beats);
    return OPTIONS.find(o => o.beats === opponentChoice.name);
  }

  let score = 0;

  // oc is the opponent choice and er expected result from the input
  for (let [oc, er] of input) {
    const opponentChoice = getRealChoice(oc, names);
    const result = results[er];
    const myChoice = getMyChoice(opponentChoice, results);
    const points = getPoints(myChoice, result);
    score += points;
  }

  return score + ' points';
}

module.exports = [partOne, partTwo];
