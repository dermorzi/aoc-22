module.exports.Grid = class Grid {
    constructor(grid) {
        this.rows = grid.map(row => row.slice());
        this.cols = Grid.rotate(grid).map(row => row.slice()).reverse();
    }

    get width() {
        return this.cols.length;
    }

    get height() {
        return this.rows.length;
    }

    static rotate(grid) {
        const rotatedGrid = [];

        for (let row of grid) {
            for (let index in row) {
                if (!rotatedGrid[index]) rotatedGrid[index] = [];
                const value = row[index];
                rotatedGrid[index].push(value);
            }
        }

        return rotatedGrid.reverse();
    }

    #getVisibleInList(list, toCoord) {
        const visible = [];
        const compare = (i) => {
            if (list[i] > last) {
                visible.push(toCoord(i));
                last = list[i];
            }
        };

        let last = -1;

        for (let i = 0, len = list.length; i < len; i++) {
            compare(i);
        }

        last = -1;

        for (let i = list.length - 1; i >= 0; i--) {
            compare(i);
        }

        return visible;
    }

    getVisibleFromOutside() {
        let visible = [];

        for (let i = 0, len = this.height; i < len; i++) {
            const list = [...this.rows[i]];
            const candidates = this.#getVisibleInList(list, (index) => `${i}:${index}`);
            visible = [...visible, ...candidates];
        }

        for (let i = 0, len = this.width; i < len; i++) {
            const list = [...this.cols[i]];
            const candidates = this.#getVisibleInList(list, (index) => `${index}:${i}`);
            visible = [...visible, ...candidates];
        }

        return new Set(visible);
    }

    getSceneScorebyCoordinates(ri, ci) {
        const ref = this.rows[ri][ci];
        const row = this.rows[ri];
        const col = this.cols[ci];

        const getViewDist = (list, count = 0) => {
            if (list.length === 0) return 0;
            for (let i = 0, len = list.length; i < len; i++) {
                count++;
                if (list[i] >= ref) break;
            }
            return count;
        };

        const up = getViewDist(col.slice(0, ri).reverse());
        const down = getViewDist(col.slice(ri + 1));
        const left = getViewDist(row.slice(0, ci).reverse());
        const right = getViewDist(row.slice(ci + 1));

        return up * down * left * right;
    }
}
