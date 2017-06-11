const step = require('./step');

module.exports = function solve(rpnExpression) {
  const steps = [];

  let currentExpression = rpnExpression;

  while (currentExpression.length > 1) {
    const nextStep = step(currentExpression);

    steps.push(nextStep);

    currentExpression = nextStep.expression;
  }

  return steps;
};
