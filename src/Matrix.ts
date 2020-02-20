import { inspect } from 'util';
import Point       from './Point';

export default class Matrix extends Array<Array<number>> {
  private _points: Array<Point>;
  public readonly n: number;
  public readonly m: number;

  constructor(args?: Array<Array<number>>) {
    let data = args ? args : [[]];
    super(...data);
    this.n = data.length;
    this.m = data[0].length;
    this._points = null;
  }

  [inspect.custom](): string {
    let lines = '';
    for (let vector of this) {
      lines += `[${vector.join(',')}],\n `;
    }

    return `[${lines.trim()}]`;
  }

  protected getAccessibleNeighbours(point: Point): Point[] {
    return [
      new Point(point.x + 1, point.y),
      new Point(point.x, point.y + 1),
      new Point(point.x - 1, point.y),
      new Point(point.x, point.y - 1),
    ].filter((point: Point) => this.isInsideBounds(point))
  }

  protected isInsideBounds(point: Point): boolean {
    return (
      point.x < this.n &&
      point.x >= 0 &&
      point.y < this.m &&
      point.y >= 0
    )
  }

  public getAllPoints(): Array<Point> {
    if (this._points) {
      return this._points;
    }
    const points: Array<Point> = [];

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        points.push(new Point(i, j));
      }
    }

    this._points = points;

    return points;
  }

  public getPointValue(point: Point): number {
    if (!this.isInsideBounds(point)) {
      throw new Error(`Point ${point} is out of bounds`);
    }
    return this[point.x][point.y];
  }

  public setPointValue(point: Point, value: number): void {
    if (!this.isInsideBounds(point)) {
      throw new Error(`Point ${point} is out of bounds`);
    }
    this[point.x][point.y] = value;
  }

  public static compare(a: Matrix, b: Matrix): boolean {
    if (
      a.n !== b.n ||
      a.m !== b.m
    ) {
      return false;
    }

    for (let vertex of a.getAllPoints()) {
      if (a.getPointValue(vertex) !== b.getPointValue(vertex)) {
        return false;
      }
    }

    return true;
  }

  public static initialize(n: number, m: number, defaultValue: number = Infinity) {
    const data = Array.from(Array(n), () => Array.from(Array(m).fill(defaultValue)))
    return new Matrix(data)
  }
}
