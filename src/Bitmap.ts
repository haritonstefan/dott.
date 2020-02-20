import Point  from './Point';
import Line   from './Line';
import Matrix from './Matrix';
import Queue  from './Queue';

export default class Bitmap extends Matrix {
  private _whites: Array<Point> | null = null;

  constructor(data: Array<Array<number>>) {
    super(data);
  }

  public setPointValue(point: Point, value: number): void {
    this._whites = null;
    super.setPointValue(point, value);
  }

  private extractPointsMatchingCriteria(): Array<Point> {
    let whites: Array<Point> = [];
    const points = this.getAllPoints();
    for (const point of points) {
      if (this.getPointValue(point) === 1) {
        whites.push(point);
      }
    }
    return whites;
  }

  get whites() {
    if (!this._whites) {
      this._whites = this.extractPointsMatchingCriteria();
    }
    return this._whites;
  }

  public estimateClosestWhiteBruteForce(): Matrix {
    const result: Matrix = new Bitmap(Matrix.initialize(this.n, this.m));

    for (let i = 0; i < this.n; i++) {
      let line: Line = new Line([]);
      for (let j = 0; j < this.m; j++) {
        let point = new Point(i, j);
        if (this.getPointValue(point)) {
          line.push(0);
        } else {
          line.push(this.whites.reduce((agg, white) => {
            let dist = Point.distance(point, white);
            return agg < dist ? agg : dist;
          }, Infinity))
        }
      }
      result[i] = line;
    }
    return result;
  }

  public estimateClosestWhiteBFS() {
    const result: Bitmap = new Bitmap(Matrix.initialize(this.n, this.m));

    const queue = new Queue<Point>();
    this.getAllPoints().forEach((vertex: Point) => queue.enqueue(vertex));
    for (let point of queue) {

      // Found the white pixel
      if (this.getPointValue(point) === 1) {
        result.setPointValue(point, 0);
        continue;
      }

      let hadUnknowns = false;
      const accessibleNeighbours = this.getAccessibleNeighbours(point);
      // Get the neighbour value with the lowest distance.
      const lowestNeighbour = accessibleNeighbours.reduce((agg: number, nPoint: Point) => {
        const neighbourValue = result.getPointValue(nPoint);
        if (neighbourValue === Infinity) {
          hadUnknowns = true;
        }
        return neighbourValue < agg ? neighbourValue : agg;
      }, Infinity);

      if (hadUnknowns) {
        // If not all neighbours were computed, then we should revisit later in search for a shortest path
        queue.enqueue(point);
      }

      const newValue = lowestNeighbour + 1;
      if (newValue < result.getPointValue(point)) {
        result.setPointValue(point, newValue);
        // Value was re-computed, so we have to recompute the neighbours
        accessibleNeighbours.forEach((vertex: Point) => queue.enqueue(vertex));
      }
    }

    return result;
  }
}
