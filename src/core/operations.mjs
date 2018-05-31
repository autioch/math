const functions = {
  sin: (a) => Math.sin(a),
  cos: (a) => Math.cos(a),
  tan: (a) => Math.tan(a),
  asin: (a) => Math.asin(a),
  acos: (a) => Math.acos(a),
  atan: (a) => Math.atan(a),
  log: (a) => Math.log(a)
};

const operations = {
  '+': {
    order: 2,
    side: 'left',
    func: (a, b) => a + b
  },
  '-': {
    order: 2,
    side: 'left',
    func: (a, b) => a - b
  },
  '*': {
    order: 3,
    side: 'left',
    func: (a, b) => a * b
  },
  '/': {
    order: 3,
    side: 'left',
    func: (a, b) => a / b
  },
  ':': {
    order: 3,
    side: 'left',
    func: (a, b) => a / b
  },
  '^': {
    order: 4,
    side: 'right',
    func: (a, b) => Math.pow(a, b)
  }
};

export default {
  functions,
  operations
};

export {
  functions,
  operations
};
