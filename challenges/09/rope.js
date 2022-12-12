class Knot {
    x = 0;
    y = 0;
    history = [];

    follow(knot) {
        const diffX = knot.x - this.x;
        const diffY = knot.y - this.y;

        if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
            if (this.x === knot.x) this.y += (diffY < 0) ? -1 : 1;
            else if (this.y === knot.y) this.x += (diffX < 0) ? -1 : 1;
            else this.x += (diffX < 0) ? -1 : 1, this.y += (diffY < 0) ? -1 : 1;
        }

        this.history.push(`${this.x}:${this.y}`);

        return this;
    }
}

module.exports.Rope = class Rope {
    constructor(length) {
        this.length = length;
        this.knots = [];
        for (let i = 0; i < length; i++) {
            const knot = new Knot();
            this.knots.push(knot);
        }
    }

    move(direction, steps) {
        const [head, ...tail] = this.knots;

        for (let i = 0; i < steps; i++) {
            head.history.push(`${head.x}:${head.y}`);

            if (direction === 'U') head.y -= 1;
            if (direction === 'D') head.y += 1;
            if (direction === 'L') head.x -= 1;
            if (direction === 'R') head.x += 1;

            let previous = head;

            for (let knot of tail) {
                previous = knot.follow(previous);
            }
        }
    }
}
