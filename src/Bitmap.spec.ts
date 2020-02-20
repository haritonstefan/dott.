import { suite, test } from 'mocha-typescript';
import * as assert     from 'assert';
import Bitmap          from './Bitmap';
import Matrix          from './Matrix';
import generator       from './generator';
import Point           from './Point';

@suite
class BitmapSpec {
  @test instantiate() {
    const n = 3;
    const m = 3;
    const bitmap = new Bitmap(generator(n, m));

    assert.ok(bitmap);
    assert.equal(bitmap.n, n);
    assert.equal(bitmap.m, m);
  }

  @test whites() {
    const n = 3;
    const m = 3;
    const bitmap = new Bitmap(generator(n, m));
    const point = new Point(1, 1);
    bitmap.setPointValue(point, 1);

    assert.ok(bitmap);
    const whites = bitmap.whites;

    assert.ok(whites[0] instanceof Point);
    assert.ok(whites.length > 1);
  }

  @test forEachMethod() {
    const data = [
      [0, 0],
      [0, 1],
    ]
    const bitmap = new Bitmap(data);

    const result = bitmap.estimateClosestWhiteBruteForce();
    assert.ok(result);
    assert.equal(result.getPointValue(new Point(0, 0)), 2);
    assert.equal(result.getPointValue(new Point(0, 1)), 1);
    assert.equal(result.getPointValue(new Point(1, 0)), 1);
    assert.equal(result.getPointValue(new Point(1, 1)), 0);
  }

  @test pseudoBFS() {
    const data = [
      [0, 0],
      [0, 1],
    ]
    const bitmap = new Bitmap(data);

    const result = bitmap.estimateClosestWhiteBFS();
    assert.ok(result);
    assert.equal(result.getPointValue(new Point(0, 0)), 2);
    assert.equal(result.getPointValue(new Point(0, 1)), 1);
    assert.equal(result.getPointValue(new Point(1, 0)), 1);
    assert.equal(result.getPointValue(new Point(1, 1)), 0);
  }

  @test setPointValue() {
    const value = 42;
    const matrix = new Matrix([[value]]);
    const [point] = matrix.getAllPoints();

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
