type Tuple = [number, number];
type M = Array<Vector>;

class Coordinate extends Array {
    public readonly x: number;
    public readonly y: number;
    constructor(x: number, y: number) {
        super(...[x,y]);
        this.x = x;
        this.y = y;
    }

    static distance(a: Coordinate, b: Coordinate): number {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
}

class Vector extends Array<number> {
    constructor(args: Array<number>) {
        super(...args);
    }
}

class Matrix extends Array<Vector> {
    private readonly n: number;
    private readonly m: number;
    private _whites: Array<Coordinate> | null = null;
    constructor(n: number, m: number, data: M) {
        super(...data);
        this.n = n;
        this.m = m;
        return this;
    }

    get whites() {
        if (!this._whites) {
            this._whites = this.extractWhites();
        }
        return this._whites;
    }

    public getValue (point: Coordinate) {
        return this[point.x][point.y];
    }

    public static print(matrix: Matrix): void {
        for (let vector of matrix) {
            console.log(vector.join(' '));
        }
    }

    private extractWhites() {
        let whites: Array<Coordinate> = [];
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                if (this[i][j]) {
                    whites.push(new Coordinate(i, j))
                }
            }
        }
        return whites;
    }

    public static distance(a: Tuple, b: Tuple) {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
    }

    public magic(): Matrix {
        const result: Matrix = new Matrix(this.n, this.m, []);

        for (let i = 0; i < this.n; i++) {
            let line: Vector = [];
            for (let j = 0; j < this.m; j++) {
                let point = new Coordinate(i, j);
                if (this.getValue(point)) {
                    line.push(0);
                } else {
                    line.push(this.whites.reduce((agg, white) => {
                        let dist = Coordinate.distance(point, white)
                        return agg < dist ? agg : dist;
                    }, Infinity))
                }
            }
            result[i] = line;
        }
        return result;
    }
}


const x = new Matrix(3, 4, [
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0]
])

console.log(Object.keys(x));

Matrix.print(x.magic());