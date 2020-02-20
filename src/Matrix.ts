import { inspect } from 'util';
import Vector      from './Vector';
import Coordinate  from './Coordinate';

export default class Matrix extends Array<Vector | Array<number>> {
  public readonly n: number;
  public readonly m: number;

  constructor(data: Vector[]) {
    super(...data);
    this.n = data.length;
    this.m = data[0].length;
  }

  [inspect.custom](): string {
    let lines = '';
    for (let vector of this) {
      lines += `[${vector.join(',')}],\n `;
    }

    return `[${lines.trim()}]`;
  }

  protected getAccessibleNeighbours(point: Coordinate): Coordinate[] {
    return [
      new Coordinate(point.x + 1, point.y),
      new Coordinate(point.x, point.y + 1),
      new Coordinate(point.x - 1, point.y),
      new Coordinate(point.x, point.y - 1),
    ].filter((point: Coordinate) => this.isInsideBounds(point))
  }

  protected isInsideBounds(point: Coordinate): boolean {
    return (
      point.x < this.n &&
      point.x >= 0 &&
      point.y < this.m &&
      point.y >= 0
    )
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

  public getVertexValue(point: Coordinate): number {
    return this[point.x]?.[point.y] ?? Infinity;
  }

  public setVertexValue(point: Coordinate, value: number): void {
    this[point.x][point.y] = value;
  }

  public static compare(a: Matrix, b: Matrix): boolean {
    if (
      a.n !== b.n ||
      a.m !== b.m
    ) {
      return false;
    }

    for (let vertex of a.getVertices()) {
      if (a.getVertexValue(vertex) !== b.getVertexValue(vertex)) {
        return false;
      }
    }

    return true;
  }

  public static initialize(n: number, m: number, defaultValue: number = Infinity) {
    return new Matrix(Array.from(Array(n), () => new Vector(Array.from(Array(m).fill(defaultValue)))))
  }
}
