import { suite, test } from 'mocha-typescript';
import * as assert     from 'assert';
import Matrix from './Matrix';
import Point  from './Point';
@suite class MatrixSpec {
  @test instantiate() {
    const matrix = new Matrix();

    assert.ok(matrix);
  }

  @test instantiateWithData() {
    const value = 42;
    const matrix = new Matrix([[value]]);

    assert.ok(matrix);

    assert.equal(matrix.n, 1);
    assert.equal(matrix.m, 1);
  }

  @test getVertices() {
    const value = 42;
    let matrix = new Matrix([[value]]);

    let points = matrix.getAllPoints();

    assert.ok(points);
    assert.equal(points.length, 1);
    assert.ok(points[0] instanceof Point);
    assert.equal(points[0].x, 0);
    assert.equal(points[0].y, 0);
  }

  @test getPointValue() {
    const value = 42;
    const matrix = new Matrix([[value]]);

    const [ point ] = matrix.getAllPoints();

    assert.ok(point instanceof Point);

    const pointValue = matrix.getPointValue(point);
    assert.equal(pointValue, value);
  }

  @test setPointValue() {
    const value = 42;
    const matrix = new Matrix([[value]]);
    const [ point ] = matrix.getAllPoints();

    const newValue = value * 2;
    matrix.setPointValue(point, newValue);

    assert.equal(matrix.getPointValue(point), newValue);
  }

  @test compare() {
    const value = 42;
    const matrixA = new Matrix([[value]]);
    const matrixB = new Matrix([[value]]);

    assert.ok(Matrix.compare(matrixA, matrixB));
    assert.ok(Matrix.compare(matrixB, matrixA));

    const matrixC = new Matrix();
    assert.ok(!Matrix.compare(matrixA, matrixC));
    assert.ok(!Matrix.compare(matrixC, matrixA));

    const matrixD = new Matrix([[value + 1]]);
    assert.ok(!Matrix.compare(matrixA, matrixD));
    assert.ok(!Matrix.compare(matrixC, matrixD));
  }
}
