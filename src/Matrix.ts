import { inspect } from 'util';
import Line        from './Line';
import Point       from './Point';

export default class Matrix extends Array<Line | Array<number>> {
  public readonly n: number;
  public readonly m: number;

  constructor(args?: Line[]) {
    let data = args ? args : [[]];
    super(...data);
    this.n = data.length ?? 0;
    this.m = data[0]?.length ?? 0;
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
    const vertices: Array<Point> = [];

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        vertices.push(new Point(i, j));
      }
    }

    return vertices;
  }

  public getPointValue(point: Point): number {
    return this[point.x]?.[point.y] ?? Infinity;
  }

  public setPointValue(point: Point, value: number): void {
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
    return new Matrix(Array.from(Array(n), () => new Line(Array.from(Array(m).fill(defaultValue)))))
  }
}
