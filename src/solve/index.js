const rawToRpn = require('./rawToRpn');
const rpnTree = require('./rpnTree');
const calculateRpn = require('./calculateRpn');
const goStepByStep = require('./goStepByStep');
const tokenize = require('./tokenize');

module.exports = function solve(expression) {
  const tokens = tokenize(expression);
  const rnp = rawToRpn(tokens);

  return {
    expression: tokens,
    value: calculateRpn(rnp),
    tree: rpnTree(rnp),
    steps: goStepByStep(rnp)
  };
};
