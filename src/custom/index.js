const operators = require('../solve/operators');
const RX_WHITE_SPACE = /\s+/g;
const RX_ALLOWED = /[0-9-+*()]/gi;

const OPERATOR_KEYS = Object.keys(operators).concat(['(', ')']);
const RX_OPERATORS = new RegExp(`([${OPERATOR_KEYS.map((key) => `\\${key}`).join('')}])`);

module.exports = function custom(userInput) {
  const charsOnly = userInput.replace(RX_WHITE_SPACE, '');
  const notAllowedChars = charsOnly.replace(RX_ALLOWED, '');

  if (notAllowedChars.length) {
    return {
      error: `Not allowed characters: ${notAllowedChars}`
    };
  }

  return {
    expression: charsOnly.split(RX_OPERATORS).filter((item) => item !== '')

  };
};
