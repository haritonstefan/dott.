import Bitmap from "./Bitmap";
import generator from "./generator";
import Matrix from "./Matrix";

const generated = generator(10, 10);
// const generated = new Matrix([
//     [0,0,0],
//     [0,0,0],
//     [0,0,1],
//     [0,0,0],
// ]);
const y = new Bitmap(generated);

let start = new Date().getTime();
let results = y.magic();
let end = new Date().getTime();

let start1 = new Date().getTime();
let results1 = y.bfs();
let end1 = new Date().getTime();

// console.log(generated);
// console.log('------');
// console.log(results);
console.log((end - start));
// console.log(results1);
console.log((end1 - start1));

console.log(Matrix.compare(results, results1));
