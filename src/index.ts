import Bitmap from "./Bitmap";
import generator from "./generator";

// const x = new Bitmap(3, 4, [
//     [0, 0, 0, 1],
//     [0, 0, 1, 1],
//     [0, 1, 1, 0]
// ]);
//
// Bitmap.print(x.magic());

const generated = generator(50, 50);
const y = new Bitmap(50, 50, generated);

let start = new Date().getTime();
let results = y.magic();
let end = new Date().getTime();

Bitmap.print(results);
console.log((end - start));
