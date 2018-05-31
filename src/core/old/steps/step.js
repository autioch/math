// import operators from '../operators';
import convert from '../convert';

export default function rnpStep(previousExpression) {
  const id = Math.max(...previousExpression.map((token) => token.id)) + 1;
  const stack = [];

  for (let index = 0; index < previousExpression.length; index++) {
    const token = previousExpression[index];

    if (token.isNumber) {
      stack.push(token);

      continue;
    }

    const right = stack.pop();
    const left = stack.pop();

    const newToken = {
      id,

      // value: operators[token.value].evalFunc(left.value, right.value),
      order: -1,
      isOperator: false,
      isNumber: true,
      isLeft: false,
      isRight: false,
      previousTokens: [left, right]
    };

    const operation = {
      target: newToken,
      left,
      right,
      operator: token
    };

    const expression = stack.concat(newToken).concat(previousExpression.slice(index + 1));

    return {
      operation,
      previousExpression,
      expression,
      previousString: convert.toText(previousExpression),
      string: convert.toText(expression)
    };
  }

  throw Error('Next step not possible!');
}
