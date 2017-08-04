import operators from '../operators';

function isLeft(token) {
  return operators[token].side === 'Left';
}

function isRight(token) {
  return operators[token].side === 'Right';
}

export default function tokenize(expression) {
  return expression.map((token, index) => {
    const numericValue = parseInt(token, 10);
    const isNumber = !isNaN(numericValue);
    const isOperator = !!operators[token];

    return {
      id: index,
      value: isNumber ? numericValue : token,
      order: isOperator ? operators[token].order : -1,
      isOperator,
      isNumber,
      isLeft: isOperator ? isLeft(token) : false,
      isRight: isOperator ? isRight(token) : false
    };
  });
}
