import getRandomTagIndex from './getRandomTagIndex';
import expandTag from './expandTag';

export default function expandExpression(exp) {
  const index = getRandomTagIndex(exp);
  const expandedTag = expandTag(exp[index]);

  return exp.substr(0, index) + expandedTag + exp.substr(index + 1, exp.length);
}
