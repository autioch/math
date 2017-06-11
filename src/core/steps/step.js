const operators = require('./operators');
const rpnToRaw = require('./rpnToRaw');

module.exports = function rnpStep(expression) {
  const id = Math.max(...expression.map((token) => token.id)) + 1;
  const stack = [];

  for (let index = 0; index < expression.length; index++) {
    const token = expression[index];

    if (token.isNumber) {
      stack.push(token);

      continue;
    }

    const right = stack.pop();
    const left = stack.pop();

    const newToken = {
      id,
      value: operators[token.value].evalFunc(left.value, right.value),
      order: -1,
      isOperator: false,
      isNumber: true,
      isLeft: false,
      isRight: false
    };

    const operation = {
      target: newToken,
      left,
      right,
      operator: token
    };

    const newExpression = stack.concat(newToken).concat(expression.slice(index + 1));

    return {
      operation,
      previousEx: expression,
      expression: newExpression,
      previousString: rpnToRaw(expression),
      string: rpnToRaw(newExpression)
    };
  }

  throw Error('Next step not possible!');
};
