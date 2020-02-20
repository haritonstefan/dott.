export default class QueueElement<T> {
  private _previous: QueueElement<T>;
  private _next: QueueElement<T>;
  private readonly _value: T;

  constructor(previous: QueueElement<T>, value: T, next: QueueElement<T> = null) {
    this._previous = previous;
    this._value = value;
    this._next = next;
  }

  set next(next: QueueElement<T>) {
    this._next = next;
  }

  get next(): QueueElement<T> {
    return this._next;
  }

  get value(): T {
    return this._value;
  }
}
