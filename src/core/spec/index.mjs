import testCases from './testCases';
import parse from '../parse';
import solve from '../solve';
import toRPN from '../toRPN';
import fs from 'fs';
import path from 'path';

const parsed = testCases.map((testCase) => {
  const { isAmbiguous, message, tokens } = parse(testCase);
  const rpnArray =  toRPN(tokens);

  return {
    testCase,
    isAmbiguous,
    message,
    rpn: rpnArray.map(item => item.value),
    rpnArray: rpnArray,
    result: solve(tokens),
    tokens
  };
});

const dir = path.dirname(import.meta.url).replace('file:///', '');
const fileName = `${dir}/parsed.json`;
const serialized = JSON.stringify(parsed, null, '  ');
const ambCount = parsed.filter((result) => result.isAmbiguous);

console.log(ambCount.length, 'ambiguous');

fs.writeFile(fileName, serialized, 'utf8', (err) => console.log(err || 'done'));
