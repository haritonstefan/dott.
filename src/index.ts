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

const cannotBeLogged = n > 21 || m > 21;

cannotBeLogged ? console.log('\x1b[31m', 'Matrix to large to be displayed') : console.log('\x1b[0m', generated);
console.log('------');
cannotBeLogged ? console.log('\x1b[31m', 'Matrix to large to be displayed') : console.log('\x1b[0m', results);
console.log('\x1b[32m', `Brute force method took ${end - start} milliseconds`);
cannotBeLogged ? console.log('\x1b[31m', 'Matrix to large to be displayed') : console.log('\x1b[0m', results1);
console.log('\x1b[32m', `Breadth first method took ${end1 - start1} milliseconds`);

Matrix.compare(results, results1) ? console.log('\x1b[32m', 'The output is equal') : console.log('\x1b[31m', 'The output is not equal');
