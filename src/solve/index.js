const parse = require('./parse');
const rawToRnp = require('./rawToRnp');
const rnpTree = require('./rnpTree');
const rnpCalculator = require('./rnpCalculator');

module.exports = function calculator(expression) {
  const parsed = parse(expression);
  const rnp = rawToRnp(parsed);

  return {
    raw: expression,
    parsed,
    value: rnpCalculator(rnp),
    tree: rnpTree(rnp)
  };
};
