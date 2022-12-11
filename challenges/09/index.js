const path = require('path');
const { readFile } = require('node:fs/promises');
const { Head } = require('./head.js');

const SAMPLE = [
    ['R', 4],
    ['U', 4],
    ['L', 3],
    ['D', 1],
    ['R', 4],
    ['D', 1],
    ['L', 5],
    ['R', 2],
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

async function partOne() {
    const moves = await loadInput();
    const head = new Head();

    for (let move of moves) {
        head.move(...move);
    }

    return head.visitedByTail.size;
}

async function partTwo() {
    const moves = await loadInput();

    return null;
}

module.exports = [partOne, partTwo];
