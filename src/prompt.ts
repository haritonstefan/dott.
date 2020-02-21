/* istanbul ignore file */
import * as assert       from 'assert';
import * as readline     from 'readline'
import Bitmap            from './Bitmap';
import { ConsoleColors } from './consoleColors';

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function parseLine(line: string): Array<number> {
  return line.trim().split(' ').map(v => parseInt(v));
}

(async function () {
  let testCasesToRun = 0;
  let currentTestCase = 1;

  await new Promise((resolve) => {
    prompt.question('How many testcases we\'ll run now? ', (answer) => {
      testCasesToRun = parseLine(answer).pop();
      return resolve();
    });
  });

  while (currentTestCase <= testCasesToRun) {
    let n = 0;
    let m = 0;
    let lines = [];
    await new Promise((resolve) => {
      prompt.question(`How big is the bitmap #${currentTestCase}? Waiting for 2 values: `, ((answer: string) => {
        [n, m] = parseLine(answer);
        assert.ok(n, 'You should specify the "height" of the bitmap');
        assert.ok(m, 'You should specify the "width" of the bitmap');
        return resolve();
      }));
    });

    while (lines.length < n) {
      await new Promise((resolve) => {
        prompt.question(`Please input the line #${lines.length + 1}, waiting for ${m} values: `, ((answer: string) => {
          const parsedLine = parseLine(answer);
          assert.equal(parsedLine.length, m, `Expected ${m} values, got ${parsedLine.length} values`);
          lines.push(parsedLine)

          return resolve();
        }));
      })
    }

    const bitmap = new Bitmap(lines);
    const start = new Date().getTime();
    const results = bitmap.estimateClosestWhiteBFS();
    const duration = new Date().getTime() - start;
    console.log(ConsoleColors.GREEN, 'For the bitmap:');
    console.log(ConsoleColors.RESET, bitmap);
    console.log(ConsoleColors.GREEN, `I computed the following distances matrix in ${duration} millisecond:`);
    console.log(ConsoleColors.RESET, results);
    currentTestCase++;
  }

  process.exit(0);
})()
