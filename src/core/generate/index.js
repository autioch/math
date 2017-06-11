const expand = require('./expand');
const fixBrackets = require('./fixBrackets');
const fillValues = require('./fillValues');

module.exports = function generate(stepCount) {
  let expression = ['e'];

  for (let step = 0; step < stepCount; step++) {
    expression = expand(expression);
  }

  return fillValues(fixBrackets(expression));
};
