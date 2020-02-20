import { suite, test } from 'mocha-typescript';
import * as assert                    from 'assert';
import Vector                   from './Vector';

@suite class VectorSpec {
  @test instantiateWithArray() {
    const value = [41, 42, 43];
    const vector = new Vector(value);
    assert.ok(vector);
    assert.equal(vector.length, value.length);
    value.forEach((v: number, index: number) => {
      assert.equal(vector[index], v);
    });
  }

}

