const path = require('path');
const { readFile } = require('node:fs/promises');
const { Rope } = require('./rope.js');

const SAMPLE_1 = [
    ['R', 4],
    ['U', 4],
    ['L', 3],
    ['D', 1],
    ['R', 4],
    ['D', 1],
    ['L', 5],
    ['R', 2],
];

const SAMPLE_2 = [
    ['R', 5],
    ['U', 8],
    ['L', 8],
    ['D', 3],
    ['R', 17],
    ['D', 10],
    ['L', 25],
    ['U', 20]
];

async function loadInput() {
    try {
        const input = await readFile(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' });
        const lines = input.split('\n');
        const data = lines.map(l => {
            const [direction, steps] = l.split(' ');
            return [direction, parseInt(steps)];
        });

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function simulate(length) {
    const moves = await loadInput();
    const rope = new Rope(length + 1);

    for (let move of moves) {
        rope.move(...move);
    }

    const last = rope.knots[rope.length - 1];
    return new Set(last.history).size;
}

const partOne = async () => await simulate(1);
const partTwo = async () => await simulate(9);

module.exports = [partOne, partTwo];
