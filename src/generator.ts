import Matrix from './Matrix';
import Line   from './Line';

export default function generator(n = 182, m = 182): Matrix {
  return new Matrix(Array.from(Array(n), () => new Line(Array.from(Array(m), () => Math.abs(Math.round(Math.random()))))))
}
