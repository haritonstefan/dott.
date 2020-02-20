import Matrix from './Matrix';

export default function generator(n = 182, m = 182): Matrix {
  return new Matrix(Array.from(Array(n), () => Array.from(Array(m), () => Math.abs(Math.round(Math.random())))))
}
