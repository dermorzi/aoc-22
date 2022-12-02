// Copyright 2022 Rene Pohland.
// SPDX-License-Identifier: Apache-2.0
const { readFile } = require('node:fs/promises');
const path = require('path');

async function getInput() {
    try {
        const input = await readFile(path.join(__dirname, '/input.txt'), { encoding: 'utf8' });
        return input.split('\n\n')
            .map(elve => (elve.split('\n').map(v => parseInt(v))));
    } catch (err) {
        console.error(err);
    }
}

function prepareAnSortInput(input) {
    return input
        .map(cur => cur.reduce((acc, cur) => acc + cur, 0))
        .sort((a, b) => b - a);;
}

async function partOne() {
    const input = await getInput().then(prepareAnSortInput);
    const result = input[0];

    return result + ' calories';
}

async function partTwo() {
    const input = await getInput().then(prepareAnSortInput);
    const result = input.slice(0, 3).reduce((acc, cur) => acc + cur, 0);
    return result + ' calories';
}

module.exports = [partOne, partTwo];
