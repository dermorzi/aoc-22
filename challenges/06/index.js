const path = require('path');
const { readFile } = require('node:fs/promises');

async function loadInput() {
  try {
    const input = await readFile(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' });
    return input;
  } catch (error) {
    console.log(error);
  }
}

function findMarkerEndPosition(buffer, marker_length) {
  if (buffer.length < marker_length) return;
  const position = buffer.length;
  const candidate = buffer.substr(position - marker_length);

  for (let char of candidate) {
    let charCount = candidate.split('').reduce((acc, cur) => (cur === char) ? acc += 1 : acc, 0);
    if (charCount > 1) return;
  }

  return position;
}


async function partOne() {
  const bufferstream = await loadInput();

  for (let i = 0, len = bufferstream.length; i < len; i++) {
    const substr = bufferstream.substr(0, i);
    const result = findMarkerEndPosition(substr, 4);
    if (result) return result;
  }

  return null;
}

async function partTwo() {
  const bufferstream = await loadInput();

  for (let i = 0, len = bufferstream.length; i < len; i++) {
    const substr = bufferstream.substr(0, i);
    const result = findMarkerEndPosition(substr, 14);
    if (result) return result;
  }

  return null;
}

module.exports = [partOne, partTwo];
