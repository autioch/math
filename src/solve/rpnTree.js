const operators = require('./operators');

module.exports = function rpnTree(sanitized) {
  const steps = [];
  const stack = [];
  let id = sanitized.length + 100;

  sanitized.forEach((token) => {
    if (token.isNumber) {
      return stack.push(token);
    }
    const o2 = stack.pop();
    const o1 = stack.pop();
    const computed = operators[token.value].evalFunc(o1.value, o2.value);
    const operation = {
      id: id++,
      left: o1,
      right: o2,
      operator: token.value,
      infix: `${o1.value} ${token.value} ${o2.value} = ${computed}`,
      value: computed
    };

    stack.push(operation);
    steps.push(operation);
  });

  return {
    value: stack[0].value,
    tree: stack[0],
    steps
  };
};
