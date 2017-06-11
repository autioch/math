const operators = require('../operators');

module.exports = function solve(rpnExpression) {
  const stack = [];

  rpnExpression.forEach((token) => {
    if (token.isNumber) {
      stack.push(token.value);

      return;
    }

    const o2 = stack.pop();
    const o1 = stack.pop();
    const computed = operators[token.value].evalFunc(o1, o2);

    stack.push(computed);
  });

  return stack[0];
};
