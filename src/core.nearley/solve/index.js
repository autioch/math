const fn = {
  sin: (a) => Math.sin(a),
  cos: (a) => Math.cos(a),
  tan: (a) => Math.tan(a),
  asin: (a) => Math.asin(a),
  acos: (a) => Math.acos(a),
  atan: (a) => Math.atan(a),
  log: (a) => Math.log(a)
};

const operations = {
  add: (a, b) => a + b,
  substract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  factor: (a, b) => Math.pow(a, b),
  decimal: (a, b) => parseFloat(`${a}.${b}`, 10)
};

function withLog(exp) {
  const value = solve(exp); // eslint-disable-line no-use-before-define

  if (Array.isArray(exp)) {
    console.log(exp, value); // eslint-disable-line no-console
  }

  return value;
}

function solve(exp) {
  if (!Array.isArray(exp)) {
    return exp.value;
  }
  if (exp.length === 5) {
    return withLog(exp.slice(1, 3));
  }
  if (exp.length === 3) {
    const left = withLog(exp[0]);
    const right = withLog(exp[2]);

    return operations[exp[1].type](left, right);
  }
  if (exp.length === 2) {
    return fn[exp[0].type](withLog(exp[1]));
  }

  return withLog(exp[0]);
}

export default withLog;
