/* eslint no-magic-numbers: 0 */
export default {
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
    evalFunc: (left, right) => left * right
  },
  '+': {
    order: 2,
    side: 'Left',
    evalFunc: (left, right) => left + right
  },
  '-': {
    order: 2,
    side: 'Left',
    evalFunc: (left, right) => left - right
  }
};
