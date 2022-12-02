// Copyright 2022 Rene Pohland.
// SPDX-License-Identifier: Apache-2.0

const { readdir } = require('node:fs/promises')
const path = require('path');

async function runParts(parts, results = []) {
  if (parts.length <= 0) return results;

  try {
    const current = parts.shift();
    results = [...results, await current()];
    return runParts(parts, results);
  } catch (error) {
    console.log(error);
  }

}

async function runChallenges(names) {
  if (names.length <= 0) return;
  console.log('---');
  const current = names.shift();

  try {
    console.log('Day ', parseInt(current));
    const parts = require('./challenges/' + current);
    const results = await runParts(parts);
    results.forEach((entry, index) => console.log(`Part ${index + 1}: ${entry}`));
    return runChallenges(names);
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  try {
    const entries = await readdir(path.resolve(__dirname, 'challenges'), { withFileTypes: true });
    const dirs = entries.filter(e => e.isDirectory()).map(e => e.name);
    console.log(`Running all ${dirs.length} challenges!`);
    await runChallenges(dirs);
  } catch (error) {
    console.error(error);
  }
})();
