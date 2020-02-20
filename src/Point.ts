import { inspect } from 'util';

export default class Point {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static distance(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  [inspect.custom]() {
    return `[${this.x}:${this.y}]`;
  }
}
