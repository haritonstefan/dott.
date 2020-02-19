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
        const result: Matrix = new Bitmap(this.n, this.m, Matrix.initialize(this.n, this.m));

        for (let i = 0; i < this.n; i++) {
            let line: Vector = new Vector([]);
            for (let j = 0; j < this.m; j++) {
                let point = new Coordinate(i, j);
                if (this.getPointValue(point)) {
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

    public distance(a: Coordinate, b: Coordinate): number {
        if (Coordinate.distance(a, b) === 1) {
            return 1 + this.getPointValue(b);
        }
        return this.getPointValue(a) + this.getPointValue(b);
    }

    public fw(): Matrix {
        const result: Matrix = new Bitmap(this.n, this.m, Matrix.initialize(this.n, this.m));

        const vertices = this.getVertices();

        for (let middleVertex of vertices) {
            for (let startVertex of vertices) {
                for (let endVertex of vertices) {
                    let distanceViaPoint;
                    if (this.getPointValue(startVertex) === 1) {
                        result.setPointValue(startVertex, 0);
                    }
                    if (result.getPointValue(startVertex) === Infinity) {
                        result.setPointValue(startVertex, result.distance(startVertex, endVertex));
                    }

                    distanceViaPoint = result.distance(startVertex, middleVertex) + result.distance(middleVertex, endVertex);

                    if (result.getPointValue(startVertex) > distanceViaPoint) {
                        result.setPointValue(startVertex, distanceViaPoint)
                    }
                }
            }
        }

        return result;
    }
}
