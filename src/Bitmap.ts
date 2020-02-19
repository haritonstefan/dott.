import Coordinate from './Coordinate';
import Vector from './Vector';
import Matrix from './Matrix';
import * as ts from "typescript/lib/tsserverlibrary";
import convertCompilerOptions = ts.server.convertCompilerOptions;

export default class Bitmap extends Matrix {
    private _whites: Array<Coordinate> | null = null;

    constructor(data: Matrix) {
        super(data);
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
        const result: Matrix = new Bitmap(Matrix.initialize(this.n, this.m));

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

    public bfs() {
        const result: Bitmap = new Bitmap(Matrix.initialize(this.n, this.m));
        let queue = this.getVertices();
        const initialQueueLength = queue.length;
        let sentinel = queue.length + 1;
        let optimize = true;
        while (queue.length > 0 && (sentinel > 0 || (queue.length < initialQueueLength ))) {
            const point = queue.shift();
            sentinel--;
            if (this.getPointValue(point) === 1) {
                result.setPointValue(point, 0);
                continue;
            }
            const pointNeighbours = [
                new Coordinate(point.x + 1, point.y),
                new Coordinate(point.x, point.y + 1),
                new Coordinate(point.x - 1, point.y),
                new Coordinate(point.x, point.y - 1),
            ]

            const neighbourValue = pointNeighbours.reduce((agg: number, nPoint: Coordinate) => {
                const pointValue = result.getPointValue(nPoint);
                return pointValue < agg ? pointValue : agg;
            }, Infinity);

            const pointValue = result.getPointValue(point);
            if (pointValue === Infinity && neighbourValue === Infinity) {
                queue.unshift(point);
            } else if (neighbourValue + 1 < pointValue) {
                result.setPointValue(point, neighbourValue + 1);
                queue.unshift(point);
            }

            if (optimize && queue.length === 0) {
                queue = this.getVertices();
                optimize = false;
                sentinel = queue.length;
            }
        }

        return result;
    }

    public recursiveMagic(): Bitmap {
        const result: Bitmap = new Bitmap(Matrix.initialize(this.n, this.m));
        function compute(inputBitmap: Bitmap, step = 1, x: number = 0, y: number = 0, q: number = Infinity): number {
            const point = new Coordinate(x, y);

            if (inputBitmap.isOutOfBounds(point)) {
                return Infinity;
            }

            // Handle already computed values (cache)
            const resultPointValue = result.getPointValue(point);
            if (resultPointValue !== Infinity && step === 1) {
                let min = new Vector([q, resultPointValue]).min();
                result.setPointValue(point, min);
                return min;
            }

            // Handle white pixel
            const pointValue = inputBitmap.getPointValue(point);
            if (pointValue === 1) {
                result.setPointValue(point, 0);
                q = 0;
            }

            const min = new Vector([
                q,
                resultPointValue,
                1 + compute(inputBitmap, step,x + step, y, q + 1),
                1 + compute(inputBitmap, step, x, y + step, q + 1),
            ]).min();

            result.setPointValue(point, min);

            return min;
        }
        compute(this);
        compute(this, -1, this.n - 1, this.m - 1);

        return result;
    }

    public fw(): Matrix {
        const result: Matrix = new Bitmap(Matrix.initialize(this.n, this.m));

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
