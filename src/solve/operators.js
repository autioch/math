module.exports = {
  // '^': {
  //   order: 4,
  //   side: 'Right',
  //   evalFunc: (a, b) => Math.pow(a, b)
  // },
  // '/': {
  //   order: 3,
  //   side: 'Left',
  //   evalFunc: (a, b) => a / b
  // },
  '*': {
    order: 3,
    side: 'Left',
    evalFunc: (a, b) => a * b
  },
  '+': {
    order: 2,
    side: 'Left',
    evalFunc: (a, b) => a + b
  },
  '-': {
    order: 2,
    side: 'Left',
    evalFunc: (a, b) => a - b
  }
};
