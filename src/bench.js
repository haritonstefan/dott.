const recurse = require('./new.js').recurse;
const print = require('./new.js').print;
const inline = require('./raw.js').inline;

const n = 3;
const m = 4;
const matrix = [
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
];

let start1 = process.hrtime().pop();
result1 = recurse(3, 4, matrix);
let end1 = process.hrtime().pop();

let start2 = process.hrtime().pop();
result2 = inline(3, 4, matrix);
let end2 = process.hrtime().pop();

print(matrix);
console.log((end1 - start1) / 1000000);
print(result1);
console.log('----------');
console.log((end2 - start2) / 1000000);
print(result2)

