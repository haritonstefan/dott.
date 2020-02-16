import Bitmap from "./Bitmap";
import generator from "./generator";

const generated = generator(182, 182);
const y = new Bitmap(182, 182, generated);

let start = new Date().getTime();
let results = y.magic();
let end = new Date().getTime();

Bitmap.print(results);
// Bitmap.print(generated)
console.log((end - start));
