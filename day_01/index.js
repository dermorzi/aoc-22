// Copyright 2022 Rene Pohland.
// SPDX-License-Identifier: Apache-2.0
const { readFile } = require('node:fs/promises');
const path = require('path');

module.exports.run = async () => {
    try {
        const input = await readFile(path.join(__dirname, '/input.txt'), { encoding: 'utf8' });
        const elves = input.split('\n\n')
            .map(elve => (elve.split('\n')))
            .map(elve => elve.reduce((a, c) => a + parseInt(c), 0))
            .sort((a, b) => b - a);

        const result1 = elves[0];
        console.log(result1);

        const result2 = elves.slice(0, 3).reduce((acc, cur) => acc + cur, 0);
        console.log(result2);
    } catch (err) {
        console.error(err);
    }
}