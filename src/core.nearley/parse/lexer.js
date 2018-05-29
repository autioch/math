const moo = require('moo');

module.exports = moo.compile({
  integer: /[0-9]+/,
  decimal: [',', '.'],
  add: '+',
  substract: '-',
  multiply: '*',
  divide: '/',
  factor: '^',
  roundOpen: '(',
  roundClose: ')',
  squareOpen: '[',
  squareClose: ']',
  curlyOpen: '{',
  curlyClose: '}',
  fn: ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log']
});
