import step from './step';

export default function solve(rpnExpression) {
  const steps = [];

  let currentExpression = rpnExpression;

  while (currentExpression.length > 1) {
    const nextStep = step(currentExpression);

    steps.push(nextStep);

    currentExpression = nextStep.expression;
  }

  return steps;
}
