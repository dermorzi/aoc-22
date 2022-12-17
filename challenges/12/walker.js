module.exports = class Walker {
  visited = [];
  stuck = [];

  constructor(grid, start, end) {
    this.grid = grid;
    this.start = start;
    this.end = end.join(':');
    this.pos = start.slice();
    this.setVisited(start);
  }

  get width() {
    return this.grid[0].length;
  }

  get height() {
    return this.grid.length;
  }

  setVisited(coords) {
    this.visited.push(coords.join(':'));
  }

  hasVisited(coords) {
    return this.visited.includes(coords.join(':'));
  }

  isOption([x, y]) {
    if (this.hasVisited([x, y])) return false;
    if (x < 0 || x >= this.width) return false;
    if (y < 0 || y >= this.height) return false;

    if (this.stuck.includes([x, y].join(':'))) return false;

    const [currX, currY] = this.pos;
    const currentHeight = this.grid[currY][currX];
    const targetHeight = this.grid[y][x];
    const heightDiff = targetHeight - currentHeight;

    if (heightDiff >= 2) return false;

    return true;
  }

  getOptions() {
    const [x, y] = this.pos;
    const candidates = [[x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y]];
    const options = [];

    for (let opt of candidates) {
      if (this.isOption(opt)) options.push(opt);
    }

    return options.sort((a, b) => this.grid[b[1]][b[0]] - this.grid[a[1]][a[0]]);
  }

  moveForwards() {
    const [option, ..._] = this.getOptions();

    if (!option) return this.moveBackwards();

    if (option.join(':') === this.end) return this.visited;

    this.pos = option;
    this.setVisited(option);
  }

  moveBackwards() {
    const currVisitedIndex = this.visited.indexOf(this.pos.join(':'));
    const back = this.visited[currVisitedIndex - 1];
    this.stuck.push(this.visited[currVisitedIndex]);
    this.visited.pop();
    this.pos = back.split(':').map(v => parseInt(v));
  }

  findPath() {
    while (true) {
      const result = this.moveForwards();
      if (result) return result.length;
    }
  }
}
