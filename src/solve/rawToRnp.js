const isNumeric = require('./isNumeric');
const ops = require('./operators');

function left(token) {
  return ops[token.value].side === 'Left';
}

function right(token) {
  return ops[token.value].side === 'Right';
}

function ord(token) {
  return ops[token.value].order;
}

module.exports = function rawToRnp(sanitized) {
  const result = [];
  const stack = [];

  sanitized.forEach((token) => {
    if (isNumeric(token.value)) {
      token.value = parseFloat(token.value, 10);

      return result.push(token);
    }
    if ('^*/+-'.indexOf(token.value) !== -1) {
      const o1 = token;
      let o2 = stack[stack.length - 1];

      while (o2 && '^*/+-'.indexOf(o2.value) !== -1 && ((left(o1) && ord(o1) <= ord(o2)) || (right(o1) && ord(o1) < ord(o2)))) {
        result.push(stack.pop());
        o2 = stack[stack.length - 1];
      }

      return stack.push(o1);
    }
    if (token.value === '(') {
      return stack.push(token);
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
