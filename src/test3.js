const attemtps = 50;
const fs = require('./index');

const input = fs.generator();

for (let t = 1; t <= attemtps; t++) {
    console.time(`#${t}`);
    fs.whites3(input);
    console.timeEnd(`#${t}`);
}