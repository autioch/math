import isNumeric from './isNumeric';
import operators from './operators';

export default function rnpCalculator(sanitized) {
  const stack = [];

  sanitized
    .map((token) => token.value)
    .forEach((value) => {
      if (isNumeric(value)) {
        return stack.push(value);
      }
      const o2 = stack.pop();
      const o1 = stack.pop();
      const computed = operators[value].evalFunc(o1, o2);

      stack.push(computed);
    });

  return stack[0];
}
