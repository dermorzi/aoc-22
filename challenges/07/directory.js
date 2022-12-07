class Directory {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.files = new Map();
    this.directories = new Map();
  }

  get size() {
    let size = 0;
    this.files.forEach(filesize => size += filesize);
    this.directories.forEach(dir => size += dir.size);

    return size;
  }

  addFile(name, filesize) {
    this.files.set(name, filesize);
  }

  addDir(dir) {
    if (this.directories.has(dir.name)) return this.directories.get(dir.name);
    this.directories.set(dir.name, dir);
    return dir;
  }

  getDir(name) {
    return this.directories.get(name) || this.addDir(new Directory(name, this));
  }

  findDirsByMaxSize(size) {
    let dirs = [];

    this.directories.forEach(dir => {
      if (dir.size <= size) {
        dirs.push(dir);
      }

      dirs = [...dirs, ...dir.findDirsByMaxSize(size)];
    });

    return dirs;
  }

  findSmallestDirWithMinimumSize(size) {
    let candidate;

    if (this.size >= size) {
      candidate = this;
    }

    this.directories.forEach(dir => {
      if (dir.size >= size) {
        if (!candidate || dir.size < candidate.size) candidate = dir;
      }

      const subCandidate = dir.findSmallestDirWithMinimumSize(size);

      if (subCandidate) {
        if (!candidate || subCandidate.size < candidate.size) candidate = subCandidate;
      }
    });

    return candidate;
  }
}

module.exports.Directory = Directory;
