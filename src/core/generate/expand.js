const ONE_THIRD = 0.34;
const TWO_THIRD = 0.67;
const ONE_QUARTER = 0.25;
const TWO_QUARTER = 0.5;
const THREE_QUARTER = 0.75;

function isTag(item) {
  return item === 'i' || item === 'e' || item === 'm';
}

function getTagIndexes(expression) {
  const indexes = [];

  for (let index = 0; index < expression.length; index++) {
    if (isTag(expression[index])) {
      indexes.push(index);
    }
  }

  return indexes;
}

function getExpansion(character, result) {
  if (character === 'e') {
    if (result < ONE_THIRD) {
      return 'i';
    }

    if (result < TWO_THIRD) {
      return 'm*m';
    }

    return 'e-e';
  }

  if (result < ONE_QUARTER) {
    return 'i';
  }

  if (result < TWO_QUARTER) {
    return 'm+m';
  }

  if (result < THREE_QUARTER) {
    return 'e-e';
  }

  return '(e+e)';
}

export default function expand(expression) {
  const indexes = getTagIndexes(expression);
  const index = indexes[Math.floor(Math.random() * indexes.length)];
  const expandRandom = Math.random();
  const expansion = getExpansion(expression[index], expandRandom).split('');

  expression.splice(index, 1, ...expansion);

  return expression;
}
