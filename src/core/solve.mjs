import { functions, operations } from './operations';

function operate(exp) {
  const [left, op, right] = exp;
  const leftArg = solve(left);
  const rightArg = solve(right);
  const operation = operations[op.value].func;

  return operation(leftArg, rightArg);
}

function fn(exp) {
  const [op, arg] = exp;
  const param = solve(arg);
  const operation = functions[op.value];

  return operation(param);
}

function bracket(exp) {
  const [, param] = exp;

  return solve(param);
}

function number(exp) {
  return exp.value;
}

function solve(exp) {
  if (!Array.isArray(exp)) {
    return number(exp);
  }
  if (exp.length === 2) {
    return fn(exp);
  }
  if (exp.length === 3) {
    if (exp[0].type === 'open') {
      return bracket(exp);
    }

    return operate(exp);
  }

  throw Error(`Unable to solve ${exp}`);
}

export default solve;
