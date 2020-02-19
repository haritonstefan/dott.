import Vector from './Vector';
import Coordinate from './Coordinate';

export default class Matrix extends Array<Vector> {
    protected readonly n: number;
    protected readonly m: number;

    constructor(n: number, m: number, data: Vector[]) {
        super(...data);
        this.n = n;
        this.m = m;
    }

    protected isRightExtreme(point: Coordinate): boolean {
        return point.x === this.n - 1 && point.y === this.m - 1;
    }

    protected isOutOfBounds(point: Coordinate): boolean {
        return (
            point.x >= this.n ||
            point.x < 0 ||
            point.y >= this.m ||
            point.y < 0
        )
    }

    public static print(matrix: Matrix): void {
        for (let vector of matrix) {
            console.log(vector.join(' '));
        }
    }

    public static initialize(n: number, m: number, defaultValue: number = Infinity) {
        return new Matrix(n, m, Array.from(Array(n), () => new Vector(Array.from(Array(m).fill(defaultValue)))))
    }

    public getVertices(): Array<Coordinate> {
        const vertices: Array<Coordinate> = [];

        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                vertices.push(new Coordinate(i, j));
            }
        }

        return vertices;
    }

    public distance(a: Coordinate, b: Coordinate): number {
        // if (Coordinate.distance(a, b) === 1) {
        //     return 1 + this.getPointValue(b);
        // }
        return this.getPointValue(a) + this.getPointValue(b);
    }

    public getVector(index: number) {
        return this[index] ?? Array.from(Array(this.m).fill(Infinity));
    }

    public getPointValue(point: Coordinate): number {
        return this[point.x]?.[point.y] ?? Infinity;
    }

    public setPointValue(point: Coordinate, value: number): void {
        this[point.x][point.y] = value;
    }
}
