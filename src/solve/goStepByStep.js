const rnpStep = require('./rnpStep');

module.exports = function goStepByStep(expression) {
  const steps = [];

  let currentExpression = expression;

  while (currentExpression.length > 1) {
    const nextStep = rnpStep(currentExpression);

    steps.push(nextStep);

    currentExpression = nextStep.expression;
  }

  return steps;
};
