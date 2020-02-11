const functions = require('./index.js');
const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

const t = {
    whites1: 0,
    whites2: 0,
    whites3: 0,
}

const bench = new Benchmark();
const matrix = functions.generator();

suite.add('whites1', () => {
    functions.whites(matrix);   
});
suite.add('whites2', () => {
    functions.whites2(matrix);   
});
suite.add('whites3', () => {
    functions.whites3(matrix);   
})

suite.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
    t[this.filter('fastest').map('name')]++;
    console.log('Slowest is ' + this.filter('slowest').map('name'));
})

suite.run();
suite.run();
suite.run();
suite.run();
suite.run();
suite.run();
suite.run();
suite.run();
suite.run();
suite.run();
suite.run();
suite.run();
suite.run();
suite.run();
suite.run();
suite.run();
suite.run();


console.log(t);