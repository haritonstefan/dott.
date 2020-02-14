import Bitmap from "./Bitmap";
import generator from "./generator";
import Matrix from './Matrix';
import Vector from './Vector';

const x = new Bitmap(3, 4, new Matrix(3, 4, [
    new Vector([0, 0, 0, 1]),
    new Vector([0, 0, 1, 1]),
    new Vector([0, 1, 1, 0])
]));

// Bitmap.print(x.magic());

const generated = generator(3, 3);
// const generated = x;
const y = new Bitmap(3, 3, generated);

let start = new Date().getTime();
let results = y.magic();
let end = new Date().getTime();

let start2 = new Date().getTime();
let results2 = y.recursiveMagic();
let end2 = new Date().getTime();

Bitmap.print(results);
console.log((end - start));
Bitmap.print(results2);
console.log((end2 - start2));
Bitmap.print(generated)
