/* istanbul ignore file */
import Bitmap    from './Bitmap';
import generator from './generator';
import Matrix    from './Matrix';

let n = 50;
let m = 50;

if (process.argv.length === 4) {
  n = parseInt(process.argv[2])
  m = parseInt(process.argv[3])
}

const generated = generator(n, m);
const bitmap = new Bitmap(generated);

let start = new Date().getTime();
let results = bitmap.estimateClosestWhiteBruteForce();
let end = new Date().getTime();

let start1 = new Date().getTime();
let results1 = bitmap.estimateClosestWhiteBFS();
let end1 = new Date().getTime();

console.log(generated);
console.log('------');
console.log(results);
console.log((end - start));
console.log(results1);
console.log((end1 - start1));

console.log(Matrix.compare(results, results1));
