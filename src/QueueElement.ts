export default class QueueElement<T> {
  private _next: QueueElement<T> = null;
  private readonly _value: T;

  constructor(value: T, next?: QueueElement<T>) {
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
