import Bitmap from "./Bitmap";
import generator from "./generator";

const generated = generator(5, 6);
const y = new Bitmap(5, 6, generated);

let start = new Date().getTime();
let results = y.magic();
let end = new Date().getTime();

let start1 = new Date().getTime();
let results1 = y.fw();
let end1 = new Date().getTime();

Bitmap.print(generated)
console.log('------');
Bitmap.print(results);
console.log((end - start));
Bitmap.print(results1);
console.log((end1 - start1));
