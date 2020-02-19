import { inspect } from 'util';
import Vector from './Vector';
import Coordinate from './Coordinate';

export default class Matrix extends Array<Vector | Array<number>> {
    public readonly n: number;
    public readonly m: number;

    constructor(data: Vector[] | Array<Array<number>>) {
        super(...data);
        this.n = data.length;
        this.m = data[0].length;
    }

    protected isOutOfBounds(point: Coordinate): boolean {
        return (
            point.x >= this.n ||
            point.x < 0 ||
            point.y >= this.m ||
            point.y < 0
        )
    }

    [inspect.custom](): string {
        let lines = '';
        for (let vector of this) {
            lines += `[${vector.join(',')}],\n `;
        }

        return `[${lines.trim()}]`;
    }

    public static initialize(n: number, m: number, defaultValue: number = Infinity) {
        return new Matrix(Array.from(Array(n), () => new Vector(Array.from(Array(m).fill(defaultValue)))))
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
        return this.getPointValue(a) + this.getPointValue(b);
    }

    public static compare(a: Matrix, b: Matrix): boolean {
        if (
            a.n !== b.n ||
            a.m !== b.m
        ) {
            return false;
        }

        for (let i = 0; i < a.n; i++) {
            for (let j = 0; j < a.m; j++) {
                const point = new Coordinate(i, j);
                if (a.getPointValue(point) !== b.getPointValue(point)) {
                    return false;
                }
            }
        }

        return true;
    }

    public getPointValue(point: Coordinate): number {
        return this[point.x]?.[point.y] ?? Infinity;
    }

    public setPointValue(point: Coordinate, value: number): void {
        this[point.x][point.y] = value;
    }
}
