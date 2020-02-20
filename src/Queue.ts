import QueueElement from './QueueElement';

export default class Queue<T> {
  private _first: QueueElement<T>
  private _last: QueueElement<T>
  private _length: number;

  constructor() {
    this._length = 0;
  }

  public get length(): number {
    return this._length;
  }

  public enqueue(value: T): void {
    const queueElement = new QueueElement(value);
    if (this._last) {
      this._last.next = queueElement;
    }
    this._last = queueElement;
    this._length++;

    if (!this._first) {
      this._first = queueElement;
    }
  }

  public dequeue(): T {
    if (!this._first) {
      throw new Error('Can\'t dequeue from empty queue');
    }
    const queueElement = this._first;
    this._first = queueElement.next;
    this._length--;
    return queueElement.value;
  }

  [Symbol.iterator](): Iterator<T> {
    return {
      next: (): IteratorResult<T> => {
        const done = this.length === 0;
        if (done) {
          return { done: true, value: null };
        }
        const value: T = this.dequeue();
        return { done: false, value };
      },
    }
  }
}
