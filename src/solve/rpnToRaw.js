function convertRPN2Tree(rpnExpr) {
  const stack = [];

  for (let index = 0; index < rpnExpr.length; index++) {
    const token = rpnExpr[index];

    if (token.isNumber) {
      stack.push({
        kind: 'number',
        value: token.value
      });
    } else {
      const o2 = stack.pop();
      const o1 = stack.pop();

      stack.push({
        kind: 'operator',
        operator: token.value,
        precedence: token.order,
        left: o1,
        right: o2
      });
    }
  }

  return stack.pop();
}

function needParensOnLeft(node) {
  return (node.left.kind === 'operator') && (node.left.precedence < node.precedence);
}

function needParensOnRight(node) {
  if (node.right.kind === 'number') {
    return false;
  }

  if ((node.operator === '+') || (node.operator === '*')) {
    return node.right.precedence < node.precedence;
  }

  return node.right.precedence <= node.precedence;
}

function visit(node) {
  if (node.kind === 'number') {
    return node.value.toString();
  }

  let lhs = visit(node.left);

  if (needParensOnLeft(node)) {
    lhs = `(${lhs})`;
  }

  let rhs = visit(node.right);

  if (needParensOnRight(node)) {
    rhs = `(${rhs})`;
  }

  return lhs + node.operator + rhs;
}

module.exports = function convertRPN2Infix(rpnExpr) {
  const tree = convertRPN2Tree(rpnExpr);

  return visit(tree);
};
