import { suite, test } from 'mocha-typescript';
import * as assert     from 'assert';
import Coordinate      from './Coordinate';
import { inspect }     from 'util';

@suite
class CoordinateSpec {
  @test instantiate() {
    const x = 42;
    const y = 24;
    const coordinate = new Coordinate(x, y);
    assert.ok(coordinate);
    assert.equal(coordinate.x, x);
    assert.equal(coordinate.y, y);
  }

  @test distanceBetweenTwoCoordinates() {
    let coordinateA = new Coordinate(1, 1);
    let coordinateB = new Coordinate(2, 1);

    assert.equal(Coordinate.distance(coordinateA, coordinateB), 1);
    assert.equal(Coordinate.distance(coordinateB, coordinateA), 1);

    coordinateB = new Coordinate(3, 4);
    assert.equal(Coordinate.distance(coordinateA, coordinateB), 5);
    assert.equal(Coordinate.distance(coordinateB, coordinateA), 5);

    coordinateA = new Coordinate(coordinateB.x, coordinateB.y);
    assert.equal(Coordinate.distance(coordinateA, coordinateB), 0);
    assert.equal(Coordinate.distance(coordinateB, coordinateA), 0);
  }

  @test inspect() {
    let coordinate = new Coordinate(1, 1);
    const inspectResult = coordinate[inspect.custom]();

    assert.ok(typeof inspectResult === 'string');
  }
}

