function isTag(item) {
  return item === 'i' || item === 'e' || item === 'm';
}

export default function fixBrackets(expression) {
  const fixed = [];

  for (let index = 0; index < expression.length - 1; index++) {
    const currentItem = expression[index];
    const nextItem = expression[index + 1];

    fixed.push(currentItem);

    if (isTag(currentItem) && nextItem === '(') {
      fixed.push('+');
    }

    if (currentItem === ')' && isTag(nextItem)) {
      fixed.push('+');
    }

    if (currentItem === ')' && nextItem === '(') {
      fixed.push('+');
    }
  }

  fixed.push(expression[expression.length - 1]);

  return fixed;
}
