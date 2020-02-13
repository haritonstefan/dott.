import Coordinate from './Coordinate';
import Vector from './Vector';
import Matrix from './Matrix';

export default class Bitmap extends Matrix {
    private _whites: Array<Coordinate> | null = null;

    constructor(n: number, m: number, data: Array<Vector>) {
        super(n, m, data);
    }

    get whites() {
        if (!this._whites) {
            this._whites = this.extractWhites();
        }
        return this._whites;
    }

    public static print(matrix: Bitmap): void {
        for (let vector of matrix) {
            console.log(vector.join(' '));
        }
    }

    private extractWhites(): Array<Coordinate> {
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

    public magic(): Matrix {
        const result: Matrix = new Bitmap(this.n, this.m, []);

        for (let i = 0; i < this.n; i++) {
            let line: Vector = new Vector([]);
            for (let j = 0; j < this.m; j++) {
                let point = new Coordinate(i, j);
                if (this.getValue(point)) {
                    line.push(0);
                } else {
                    line.push(this.whites.reduce((agg, white) => {
                        let dist = Coordinate.distance(point, white);
                        return agg < dist ? agg : dist;
                    }, Infinity))
                }
            }
            result[i] = line;
        }
        return result;
    }

    compute(result: Matrix, x: number = 0, y: number = 0, q: number = Infinity): number {
        const point = new Coordinate(x, y);

        if (this.isOutOfBounds(point)) {
            return Infinity;
        }

        const pointValue = this.getValue(point);

        // Handle already computed values (cache)
        const resultPointValue = result.getValue(point);
        if (resultPointValue !== Infinity) {
            return resultPointValue
        }

        // Handle white pixel
        if (pointValue === 1) {
            result.setValue(point, 0);
            q = 0;
        }

        const base = (q === 0 ? 0 : 1);

        const min = base + new Vector([
            q,
            this.compute(result, x + 1, y, q + 1),
            this.compute(result, x, y + 1, q + 1)
        ]).min();

        result.setValue(point, min);

        return min;
    }

    public recursiveMagic(): Matrix {
        const result = Matrix.initialize(this.n, this.m);
        result =
        return result;
    }
}
