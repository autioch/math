import expand from './expand';
import fixBrackets from './fixBrackets';
import fillValues from './fillValues';

export default function generate(stepCount) {
  let expression = ['e'];

  for (let step = 0; step < stepCount; step++) {
    expression = expand(expression);
  }

  return fillValues(fixBrackets(expression));
}
