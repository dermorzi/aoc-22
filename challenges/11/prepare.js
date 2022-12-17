const { Monkey } = require('./monkey.js');

function parseId(line) {
  const [_, id] = line.replace(':', '').split(' ');
  return parseInt(id);
}

function parseItems(line) {
  return line.replace('Starting items: ', '')
    .split(',').map(item => parseInt(item.trim()));
}

function parseOperation(line) {
  const trimmed = line.replace('Operation: new = ', '');
  let [_, operator, val] = trimmed.split(' ');

  val = parseInt(val) || val;

  if (operator === '*') {
    return (typeof val === 'number')
      ? (old) => old * val : (old) => old * old;
  } else if (operator === '+') {
    return (typeof val === 'number')
      ? (old) => old + val : (old) => old + old;
  }
}

function parseTarget(line) {
  return parseInt(line.split(' ').reverse()[0]);
}

module.exports.prepareInput = function prepareInput(inputArr) {
  const monkeys = [];

  for (let block of inputArr) {
    const [monkeyTxt, inventoryTxt, operationTxt, testTxt, trueTargetTxt, falseTargetTxt] = block.split('\n')
      .map(line => line.trim());

    const id = parseId(monkeyTxt);
    const items = parseItems(inventoryTxt);
    const operation = parseOperation(operationTxt);
    const divisibleBy = parseInt(testTxt.split(' ').reverse()[0]);
    const targets = [
      parseTarget(falseTargetTxt),
      parseTarget(trueTargetTxt),
    ];

    const monkey = new Monkey(id, items, monkeys);
    monkey
      .addTest(divisibleBy, targets)
      .addOperation(operation);
    monkeys[id] = monkey;
  }

  return monkeys;
}
