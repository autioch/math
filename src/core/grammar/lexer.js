const moo = require('moo');

module.exports = moo.compile({
  number: /[0-9]+/,
  as: ['+', '-'],
  md: ['*', '/', ':'],
  pow: '^',
  open: '(',
  close: ')',
  fn: ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log']
});
