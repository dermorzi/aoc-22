class Vector {
    x = 0;
    y = 0;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static dist(head, tail) {
        const headc = head.copy();
        headc.x -= tail.x;
        headc.y -= tail.y;

        return headc;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Vector(this.x, this.y);
    }
}

class Tail extends Vector {
    #parent;
    #visited = ['0:0'];

    constructor(parent) {
        super();
        this.#parent = parent;
    }

    #addVisited(x, y) {
        this.#visited.push(`${x}:${y}`);
    }

    get visited() {
        return new Set(this.#visited);
    }

    follow() {
        const dist = Vector.dist(this.#parent, this);

        if (Math.abs(dist.x) > 1 || Math.abs(dist.y) > 1) {
            const { x, y } = this.#parent.last;
            this.set(x, y);
            this.#addVisited(x, y);
        }
    }
}

module.exports.Head = class Head extends Vector {
    #tail;
    last;

    constructor() {
        super();
        this.#tail = new Tail(this);
    }

    get visitedByTail() {
        return this.#tail.visited;
    }

    move(dir, steps) {
        for (let i = 0; i < steps; i++) {
            this.last = this.copy();

            if (dir === 'U') this.y++;
            if (dir === 'D') this.y--;
            if (dir === 'R') this.x++;
            if (dir === 'L') this.x--;

            this.#tail.follow();
        }
    }
}
