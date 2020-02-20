import Matrix from './Matrix';
import Vector from './Vector';

export default function generator(n = 182, m = 182): Matrix {
  return new Matrix(Array.from(Array(n), () => new Vector(Array.from(Array(m), () => Math.abs(Math.round(Math.random()))))))
}
