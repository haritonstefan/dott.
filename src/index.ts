/* istanbul ignore file */
import Bitmap            from './Bitmap';
import { ConsoleColors } from './consoleColors';
import generator         from './generator';
import Matrix            from './Matrix';

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

cannotBeLogged ? console.log(ConsoleColors.RED, 'Matrix to large to be displayed') : console.log(ConsoleColors.RESET, generated);
console.log('------');
cannotBeLogged ? console.log(ConsoleColors.RED, 'Matrix to large to be displayed') : console.log(ConsoleColors.RESET, results);
console.log(ConsoleColors.GREEN, `Brute force method took ${end - start} milliseconds`);
cannotBeLogged ? console.log(ConsoleColors.RED, 'Matrix to large to be displayed') : console.log(ConsoleColors.RESET, results1);
console.log(ConsoleColors.RED, `Breadth first method took ${end1 - start1} milliseconds`);

Matrix.compare(results, results1) ? console.log(ConsoleColors.RED, 'The output is equal') : console.log(ConsoleColors.RED, 'The output is not equal');
