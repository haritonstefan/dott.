import { suite, test } from 'mocha-typescript';
import * as assert     from 'assert';
import Queue    from './Queue';

@suite
class QueueSpec {
  @test instantiate() {
    const queue = new Queue<number>();
    assert.ok(queue);
    assert.equal(queue.length, 0);
  }

  @test enqueue() {
    const value = 42;
    const queue = new Queue<number>();
    queue.enqueue(value);

    assert.ok(queue);
    assert.equal(queue.length, 1);
  }

  @test dequeue() {
    const value = 42;
    const queue = new Queue<number>();
    queue.enqueue(value);

    assert.ok(queue);
    assert.equal(queue.length, 1);
    const dequeuedValue = queue.dequeue();
    assert.equal(dequeuedValue, value);
    assert.equal(queue.length, 0);
  }

  @test iterator() {
    const values = [42, 43, 42];
    const queue = new Queue<number>();
    values.forEach((value: number) => queue.enqueue(value));

    assert.equal(queue.length, values.length);

    let iterations: number = 0;

    for (let value of queue) {
      iterations++;
      assert.ok(values.indexOf(value) > -1);
    }

    assert.equal(iterations, values.length);
    assert.equal(queue.length, 0);
  }
}

