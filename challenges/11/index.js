const path = require('node:path');
const { readFileSync } = require('node:fs');
const { prepareInput } = require('./prepare.js');

function loadInput(filename) {
  try {
    const input = readFileSync(path.resolve(__dirname, filename), { encoding: 'utf8' });
    return input.split('\n\n');
  } catch (error) {
    console.error(error);
  }
}

function round(monkeys, worryDivisor, modulo) {
  for (let monkey of monkeys) {
    for (let item of monkey.items) {
      monkey.inspect(item, worryDivisor, modulo);
    }

    monkey.items = [];
  }
}

function run(times, monkeys, worryDivisor, modulo) {
  for (let i = 0; i < times; i++) {
    round(monkeys, worryDivisor, modulo);
  }
}

const INPUT = loadInput('input.txt');
const SAMPLE = loadInput('sample.txt');

module.exports = [() => {
  const monkeys = prepareInput(INPUT);
  run(20, monkeys, 3);
  const [first, second, ..._] = monkeys.slice().sort((a, b) => b.inspected - a.inspected);
  return first.inspected * second.inspected;
}, () => {
  const monkeys = prepareInput(INPUT);
  const divisor = monkeys.map(m => m.divisibleBy).reduce((sum, d) => sum * d, 1);
  run(10_000, monkeys, divisor, true);
  const [first, second, ..._] = monkeys.slice().sort((a, b) => b.inspected - a.inspected);
  return first.inspected * second.inspected;
}];
