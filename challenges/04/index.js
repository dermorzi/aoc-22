const path = require('path');
const { readFile } = require('node:fs/promises');

async function loadInput() {
  try {
    const input = await readFile(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' });
    const pairStrings = input.split('\n').map(str => str.split(','));
    const pairs = pairStrings.map(pair =>
      pair.map(elve => {
        const [min, max] = elve.split('-').map(num => parseInt(num));
        return (min > max) ? [max, min] : [min, max];
      })
    );
    return pairs;
  } catch (error) {
    console.error(error);
  }
}

function rangeContainsRange(a, b) {
  return (a[0] <= b[0] && a[1] >= b[1]);
}

function rangesOverlap(a, b) {
  if (a[0] >= b[0] && a[0] <= b[1]) return true;
  if (a[1] >= b[0] && a[1] <= b[1]) return true;
  if (b[0] >= a[0] && b[0] <= a[1]) return true;
  if (b[1] >= a[0] && b[1] <= a[1]) return true;
  return false;
}

async function partOne() {
  const pairs = await loadInput();
  let containingPairsCount = 0;

  for (let [one, two] of pairs) {
    if (rangeContainsRange(one, two) || rangeContainsRange(two, one))
      containingPairsCount++;
  }

  return containingPairsCount + ' containments';
}

async function partTwo() {
  const pairs = await loadInput();
  let overlapingPairsCount = 0;

  for (let [one, two] of pairs) {
    if (rangesOverlap(one, two)) overlapingPairsCount++;
  }

  return overlapingPairsCount + ' overlaps';
}

module.exports = [partOne, partTwo];
