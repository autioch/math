const expandTag = require('./expandTag');
const fixBrackets = require('./fixBrackets');

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

/* Actually max will be 12. */
const MAX_VALUE = 10;
const MIN_VALUE = 2;

module.exports = function generate(stepCount) {
  const expression = ['e'];

  for (let step = 0; step < stepCount; step++) {
    const indexes = getTagIndexes(expression);
    const index = indexes[Math.floor(Math.random() * indexes.length)];

    expression.splice(index, 1, ...expandTag(expression[index]));
  }

  return fixBrackets(expression).map((item) => {
    if (isTag(item)) {
      return Math.round(Math.random() * MAX_VALUE) + MIN_VALUE;
    }

    return item;
  });
};
