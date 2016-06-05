import isNumeric from './isNumeric';
import operators from './operators';

export default function rnpTree(sanitized) {
  const steps = [];
  const stack = [];
  let id = sanitized.length + 100;
  sanitized.forEach(function(token) {
    if (isNumeric(token.value)) {
      return stack.push(token);
    }
    const o2 = stack.pop();
    const o1 = stack.pop();
    const value = operators[token.value].evalFunc(o1.value, o2.value);
    const node = {
      id: id++,
      left: o1,
      right: o2,
      operator: token.value,
      infix: o1.value + ' ' + token.value + ' ' + o2.value + ' = ' + value,
      value: value
    };
    stack.push(node);
    steps.push(node);
  });
  return {
    value: stack[0].value,
    tree: stack[0],
    steps: steps
  };
}
