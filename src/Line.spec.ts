import { suite, test } from 'mocha-typescript';
import * as assert from 'assert';
import Line        from './Line';

@suite class LineSpec {
  @test instantiate() {
    const line = new Line();

    assert.ok(line);
    assert.ok(line.length === 0);
  }
  @test instantiateWithArray() {
    const value = [41, 42, 43];
    const line = new Line(value);
    assert.ok(line);
    assert.equal(line.length, value.length);
    value.forEach((v: number, index: number) => {
      assert.equal(line[index], v);
    });
  }

}

