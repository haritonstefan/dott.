import { suite, test } from 'mocha-typescript';
import * as assert from 'assert';
import Point       from './Point';
import { inspect } from 'util';

@suite
class PointSpec {
  @test instantiate() {
    const x = 42;
    const y = 24;
    const coordinate = new Point(x, y);
    assert.ok(coordinate);
    assert.equal(coordinate.x, x);
    assert.equal(coordinate.y, y);
  }

  @test distanceBetweenTwoCoordinates() {
    let coordinateA = new Point(1, 1);
    let coordinateB = new Point(2, 1);

    assert.equal(Point.distance(coordinateA, coordinateB), 1);
    assert.equal(Point.distance(coordinateB, coordinateA), 1);

    coordinateB = new Point(3, 4);
    assert.equal(Point.distance(coordinateA, coordinateB), 5);
    assert.equal(Point.distance(coordinateB, coordinateA), 5);

    coordinateA = new Point(coordinateB.x, coordinateB.y);
    assert.equal(Point.distance(coordinateA, coordinateB), 0);
    assert.equal(Point.distance(coordinateB, coordinateA), 0);
  }

  @test inspect() {
    let coordinate = new Point(1, 1);
    const inspectResult = coordinate[inspect.custom]();

    assert.ok(typeof inspectResult === 'string');
  }
}

