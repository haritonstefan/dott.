const fncts = require('./raw.js');
const fs = require('fs');

const matrix = JSON.parse(fs.readFileSync('./data.json'));

let start = process.hrtime().pop();
fncts.whites2(matrix);
let end = process.hrtime().pop();
console.log((end - start) / 1000000);
