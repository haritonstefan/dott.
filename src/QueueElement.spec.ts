import { suite, test } from 'mocha-typescript';
import * as assert     from 'assert';
import QueueElement    from './QueueElement';

@suite
class QueueElementSpec {
  @test instantiate() {
    const value = 42;
    const queueElement = new QueueElement(value);
    assert.equal(queueElement.value, value);
    assert.equal(queueElement.next, undefined);
  }

  @test instantiateWithPrevious() {
    const value = 42;
    const queueElement = new QueueElement(value);
    const queueElementWithNext = new QueueElement(value + 1, queueElement);

    assert.equal(queueElementWithNext.next, queueElement);
    assert.equal(queueElement.next, null);
    assert.equal(queueElementWithNext.value, value + 1);
  }

  @test setNext() {
    const value = 42;
    const queueElement = new QueueElement(value);
    const nextQueueElement = new QueueElement(value + 1);
    queueElement.next = nextQueueElement;

    assert.equal(queueElement.value, value);
    assert.equal(queueElement.next, nextQueueElement);
    assert.equal(queueElement.next.value, value + 1);
    assert.equal(queueElement.next.next, null);
  }
}

