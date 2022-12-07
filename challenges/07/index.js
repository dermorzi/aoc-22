const path = require('path');
const { readFile } = require('node:fs/promises');
const { Directory } = require('./directory.js');

async function loadInput() {
  try {
    const input = await readFile(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' });
    return input.split('\n').map(line => line.split(' '));
  } catch (error) {
    console.error(error);
  }
}

function cd(path, activeDir) {
  if (path === '..') return activeDir.parent;
  return activeDir ? activeDir.getDir(path) : new Directory(path);
}

function executeCommand(line, dir) {
  const [_, command, argument] = line;

  if (command === 'cd') dir = cd(argument, dir);

  return dir;
}

function buildDirectoryTree(output) {
  const tree = new Directory('/');
  let activeDir = tree;

  for (let line of output) {
    if (line[0] === '$') activeDir = executeCommand(line, activeDir);
    else if (line[0] === 'dir') activeDir.getDir(line[1]);
    else activeDir.addFile(line[1], parseInt(line[0]));
  }

  return tree;
}

async function partOne() {
  const sysOutput = await loadInput();
  const dirTree = buildDirectoryTree(sysOutput);
  const candidates = dirTree.findDirsByMaxSize(100_000);
  const sizesSum = candidates.reduce((sum, dir) => sum + dir.size, 0);

  return sizesSum;
}

async function partTwo() {
  const MAX_MEMORY = 70_000_000;
  const UPDATE_SIZE = 30_000_000;
  const sysOutput = await loadInput();
  const dirTree = buildDirectoryTree(sysOutput);
  const freeSpaceNeeded = UPDATE_SIZE - (MAX_MEMORY - dirTree.size);
  const candidate = dirTree.findSmallestDirWithMinimumSize(freeSpaceNeeded);

  return candidate.size;
}

module.exports = [partOne, partTwo];
