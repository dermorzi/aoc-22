const path = require('path');
const { access, writeFile, mkdir } = require('node:fs/promises');
const constants = require('node:fs');

async function pathExists(path) {
    return await access(path, constants.F_OK).then(_ => true).catch(_ => false);
}

async function createChallenge(base_path) {
    try {
        await mkdir(base_path);
        await writeFile(path.resolve(base_path, 'index.js'), '', { encoding: 'utf8' });
        await writeFile(path.resolve(base_path, 'input.txt'), '', { encoding: 'utf8' });
        await writeFile(path.resolve(base_path, 'sample.txt'), '', { encoding: 'utf8' });
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    const day = process.argv[2];
    const challengePath = path.resolve(__dirname, '..', 'challenges', day);
    const challengeDir = await pathExists(challengePath);

    if (challengeDir) return console.log(`The directory for the challenge ${day} already exists.`);

    await createChallenge(challengePath);
    console.log('Challenge directory successfully created.');
})();
