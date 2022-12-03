const path = require('path');
const { readFile } = require('node:fs/promises');

async function loadInput() {
  try {
    const fileContent = await readFile(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' });
    return fileContent.split('\n');
  } catch (error) {
    console.error(error);
  }
}

const ITEM_TYPES = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getIncorrectPackedItems(rucksack) {
  const itemCount = rucksack.length;
  const [c1, c2] = [rucksack.substring(0, itemCount / 2), rucksack.substring(itemCount / 2)];
  const incorrect = [];

  for (let char of c1.split('')) {
    if (c2.includes(char) && !incorrect.includes(char)) incorrect.push(char);
  }

  return incorrect;
}

function getItemPriority(item) {
  return ITEM_TYPES.indexOf(item) + 1;
}

function getBadges(rucksacks, badges = []) {
  if (rucksacks.length < 3) return badges;
  const [one, two, three] = rucksacks.splice(0, 3);
  const groupBadges = [];

  for (let item of one.split('')) {
    if (groupBadges.includes(item)) continue;
    if (two.includes(item) && three.includes(item)) groupBadges.push(item);
  }

  return getBadges(rucksacks, [...badges, ...groupBadges]);
}

async function partOne() {
  const input = await loadInput();
  let result = 0;

  for (let rucksack of input) {
    const incorrectItems = getIncorrectPackedItems(rucksack);
    result += incorrectItems.reduce((acc, cur) => acc + getItemPriority(cur), 0);
  }

  return result;
}

async function partTwo() {
  const input = await loadInput();
  const badges = getBadges(input.slice());
  let result = 0;

  for (let badge of badges) {
    result += getItemPriority(badge);
  }

  return result;
}

module.exports = [partOne, partTwo];
