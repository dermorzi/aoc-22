const path = require('path');
const day = process.argv[2];

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

(async () => {
  if (!parseInt(day)) throw new Error(`${day} is not valid for a day!`);

  try {
    console.log('Day ', parseInt(day));
    const parts = await require(path.resolve(__dirname, 'challenges', day));
    const results = await runParts(parts);
    results.forEach((entry, index) => console.log(`Part ${index + 1}: ${entry}`));
    return;
  } catch (error) {
    console.error(error);
  }
})();
