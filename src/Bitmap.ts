import Coordinate from './Coordinate';
import Vector from './Vector';
import Matrix from './Matrix';

export default class Bitmap extends Matrix {
    private _whites: Array<Coordinate> | null = null;

    constructor(n: number, m: number, data: Matrix) {
        super(n, m, data);
    }

    get whites() {
        if (!this._whites) {
            this._whites = this.extractWhites();
        }
        return this._whites;
    }

    private extractWhites(): Array<Coordinate> {
        let whites: Array<Coordinate> = [];
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                if (this[i]?.[j]) {
                    whites.push(new Coordinate(i, j))
                }
            }
        }
        return whites;
    }

    public magic(): Matrix {
        const result: Matrix = new Bitmap(this.n, this.m, Matrix.initialize(3, 4));

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
}
