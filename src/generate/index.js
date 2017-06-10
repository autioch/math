import expandExpression from './expandExpression';
import replaceAllTags from './replaceAllTags';
import fixBrackets from './fixBrackets';

export default function generate(stepCount) {
  let expression = 'e';

  for (let i = 0; i < stepCount; i++) {
    expression = expandExpression(expression);
  }

  return replaceAllTags(fixBrackets(expression));
}
