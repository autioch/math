import _ from 'lodash';
import { operations } from './operations';

const { flattenDeep } = _;
const isOperator = ({ type }) => type === 'as' || type === 'md' || type === 'pow';

export default function toRpn(exp) {
  const result = [];
  const stack = [];
  const expression = flattenDeep(exp);

  expression.forEach((token) => { // eslint-disable-line max-statements
    if (token.type === 'number' || token.type === 'fn') {
      result.push(token);

      return;
    }

    if (isOperator(token)) {
      let o2 = stack[stack.length - 1];
      const o1 = token;
      const o1Def = operations[o1.value];

      let o2isOperator = o2 && isOperator(o2);
      let o2Def = o2 ? operations[o2.value] : null;
      let leftBeforeRight = o2isOperator && o1Def.side === 'left' && o1Def.order <= o2Def.order;
      let rightBeforeLeft = o2isOperator && o1Def.side === 'right' && o1Def.order < o2Def.order;

      while (leftBeforeRight || rightBeforeLeft) {
        result.push(stack.pop());
        o2 = stack[stack.length - 1];
        o2isOperator = o2 && isOperator(o2);
        o2Def = o2 ? operations[o2.value] : null;
        leftBeforeRight = o2isOperator && o1Def.side === 'left' && o1Def.order <= o2Def.order;
        rightBeforeLeft = o2isOperator && o1Def.side === 'right' && o1Def.order < o2Def.order;
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
}
