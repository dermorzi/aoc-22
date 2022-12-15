const path = require('node:path');
const { readFileSync } = require('node:fs');

function loadInput(type = 'input') {
    try {
        const filepath  = path.resolve(__dirname, type + '.txt');
        const content = readFileSync(filepath, { encoding: 'utf8' });
        const input = content.split('\n\n').map(block => {
            const lines = block.split('\n')
            return lines.map(line => {
                line = line.split(' ');
                if (line.length === 1) return line;

                const [command, argument] = line;
                return [command, parseInt(argument)];
            });
        });

        return input;
    } catch (error) {
        console.error(error);
    }
}

function prepareInput(instruction) {
    const [command] = instruction;

    return (command === 'addx') ? [instruction, instruction] : [instruction];
}

const [INPUT] = loadInput();
const [SAMPLE] = loadInput('sample');
const REGISTERS = { X: 1, };
const SIGNALS = [];
let ROW = '';
let IMAGE = '\n';

let cycleCount = 0;
let last;
let draw = false;

function getSpritePosition() {
    const middle = REGISTERS.X;

    return [middle - 1, middle, middle + 1];
}

function execute([command, argument]) {
    if (command === 'addx') REGISTERS.X += argument;
}

function cycle(instructions) {
    if (instructions.length <= 0) return;
    const spritePos = getSpritePosition();
    const [line, ...rest] = instructions;

    ++cycleCount;

    if (spritePos.includes((cycleCount - 1) % 40)) {
        ROW += '#';
    } else {
        ROW += '.';
    }

    if (cycleCount % 40 === 0) {
        IMAGE += ROW + '\n';
        ROW = '';
    }
    if (cycleCount % 40 === 20) SIGNALS.push([REGISTERS.X, cycleCount]);
    if (line === last) execute(line);
    last = line;

    return cycle(rest);
}

let instructions = [];

for (let line of INPUT) {
    const result = prepareInput(line);
    instructions = [...instructions, ...result];
}

module.exports = [
    () => {
        cycle(instructions);
        return SIGNALS.reduce((sum, [x, cycle]) => sum + (x * cycle), 0);
    },
    () => {
        cycle(instructions);
        return IMAGE;
    }
];
