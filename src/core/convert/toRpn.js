module.exports = function toRpn(expression) {
  const result = [];
  const stack = [];

  expression.forEach((token) => {
    if (token.isNumber) {
      result.push(token);

      return;
    }

    if (token.isOperator) {
      const o1 = token;
      let o2 = stack[stack.length - 1];

      while (o2 && o2.isOperator && ((o1.isLeft && o1.order <= o2.order) || (o1.isRight && o1.order < o2.order))) {
        result.push(stack.pop());
        o2 = stack[stack.length - 1];
      }

      stack.push(o1);

      return;
    }

    if (token.value === '(') {
      stack.push(token);

      return;
    }

    if (token.value === ')') {
      while (stack[stack.length - 1].value !== '(') {
        result.push(stack.pop());
      }
      stack.pop();
    }
  });

  return result.concat(stack.reverse());
};
