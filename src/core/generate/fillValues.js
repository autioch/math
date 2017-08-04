/* Actually max will be 12. */
const MAX_VALUE = 10;
const MIN_VALUE = 2;

function isTag(item) {
  return item === 'i' || item === 'e' || item === 'm';
}

export default function fillValues(expression) {
  return expression.map((item) => {
    if (isTag(item)) {
      return Math.round(Math.random() * MAX_VALUE) + MIN_VALUE;
    }

    return item;
  });
}
