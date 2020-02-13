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

    public static initialize(n: number, m: number, defaultValue: number = Infinity) {
        return Matrix.from(Array(n), () => Vector.from(Array(m).fill(defaultValue)));
    }

    public getValue(point: Coordinate): number {
        return this[point.x]?.[point.y] ?? Infinity;
    }

    public setValue(point: Coordinate, value: number): void {
        this[point.x][point.y] = value;
    }
}
