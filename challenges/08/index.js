const path = require('path');
const { readFile } = require('node:fs/promises');
const { Grid } = require('./grid.js');

async function loadInput() {
    try {
        const input = await readFile(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' });
        const rows = input.split('\n');
        const grid = rows.map(row => row.split('').map(digit => parseInt(digit)));
        return grid;
    } catch (error) {
        console.error(error);
    }
}

async function partOne() {
    const input = await loadInput();
    const grid = new Grid(input);
    const visible = grid.getVisibleFromOutside();
    return visible.size;
}

async function partTwo() {
    const input = await loadInput();
    const grid = new Grid(input);
    let highestSceneScore = 0;

    for (let row = 0, len = grid.height; row < len; row++) {
        for (let col = 0, len = grid.width; col < len; col++) {
            const sceneScore = grid.getSceneScorebyCoordinates(row, col);

            if (sceneScore > highestSceneScore) highestSceneScore = sceneScore;
        }
    }

    return highestSceneScore;
}

module.exports = [partOne, partTwo];
