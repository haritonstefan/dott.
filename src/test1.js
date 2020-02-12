const fncts = require('./raw.js');
const fs = require('fs');

const matrix = JSON.parse(fs.readFileSync('./data.json'));

setTimeout(async () => {
    let start = process.hrtime().pop();
    let w2 = fncts.whites2(matrix);
    let w2t = (process.hrtime().pop() - start) / 1000000;

    await new Promise((resolve => setTimeout(resolve, 3000)));

    start = process.hrtime().pop();
    let w1 = fncts.whites(matrix);
    let w1t = (process.hrtime().pop() - start) / 1000000;

    await new Promise((resolve => setTimeout(resolve, 3000)));

    start = process.hrtime().pop();
    let w3 = fncts.whites3(matrix);
    let w3t = (process.hrtime().pop() - start) / 1000000;

    console.log('w1t', w1t, w1[0]);
    console.log('w2t', w2t, w2[0]);
    console.log('w3t', w3t, w3[0]);
}, 3000);
