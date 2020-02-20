import Coordinate from './Coordinate';
import Vector     from './Vector';
import Matrix     from './Matrix';
import Queue      from './Queue';

export default class Bitmap extends Matrix {
  private _whites: Array<Coordinate> | null = null;

  constructor(data: Matrix) {
    super(data);
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

  get whites() {
    if (!this._whites) {
      this._whites = this.extractWhites();
    }
    return this._whites;
  }

  public magic(): Matrix {
    const result: Matrix = new Bitmap(Matrix.initialize(this.n, this.m));

    for (let i = 0; i < this.n; i++) {
      let line: Vector = new Vector([]);
      for (let j = 0; j < this.m; j++) {
        let point = new Coordinate(i, j);
        if (this.getVertexValue(point)) {
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

  public bfs() {
    const result: Bitmap = new Bitmap(Matrix.initialize(this.n, this.m));

    const queue = new Queue<Coordinate>();
    this.getVertices().forEach((vertex: Coordinate) => queue.enqueue(vertex));
    for (let point of queue) {

      // Found the white pixel
      if (this.getVertexValue(point) === 1) {
        result.setVertexValue(point, 0);
        continue;
      }

      let hadUnknowns = false;
      const accessibleNeighbours = this.getAccessibleNeighbours(point);
      // Get the neighbour value with the lowest distance.
      const lowestNeighbour = accessibleNeighbours.reduce((agg: number, nPoint: Coordinate) => {
        const neighbourValue = result.getVertexValue(nPoint);
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
      if (newValue < result.getVertexValue(point)) {
        result.setVertexValue(point, newValue);
        // Value was re-computed, so we have to recompute the neighbours
        accessibleNeighbours.forEach((vertex: Coordinate) => queue.enqueue(vertex));
      }
    }

    return result;
  }
}
