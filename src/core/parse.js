import grammar from './grammar/grammar';
import { Parser } from 'nearley';

const RX_WHITE_SPACE = /\s+/g;

function parse(arr) {
  if (Array.isArray(arr)) {
    return arr.map((item) => parse(item));
  }

  const value = parseFloat(arr.value);

  return {
    type: arr.type,
    value: isNaN(value) ? arr.value : value
  };
}

export default function tokenize(text) {
  const charsOnly = text.trim().replace(RX_WHITE_SPACE, '');

  let tokens = [];
  let message = '';

  try {
    tokens = new Parser(grammar).feed(charsOnly).results[0]; // eslint-disable-line prefer-destructuring
  } catch (err) {
    message = err.message; // eslint-disable-line prefer-destructuring
  }

  return {
    tokens: parse(tokens),
    message
  };
}
