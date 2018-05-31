import grammar from './grammar';
import { Parser } from 'nearley';

const RX_WHITE_SPACE = /\s+/g;

function simplify(arr) {
  if (!Array.isArray(arr)) {
    const value = parseInt(arr.value, 10);

    return {
      type: arr.type,
      value: isNaN(value) ? arr.value : value
    };
  }
  const filtered = arr.filter((item) => !Array.isArray(item) || item.length > 0);

  if (filtered.length === 1) {
    return simplify(filtered[0]);
  }

  return filtered.map((item) => simplify(item));
}

export default function parse(text) {
  const charsOnly = text.trim().replace(RX_WHITE_SPACE, '');

  let tokens = [];
  let message = '';

  try {
    tokens = new Parser(grammar).feed(charsOnly).results[0]; // eslint-disable-line prefer-destructuring
  } catch (err) {
    message = err.message; // eslint-disable-line prefer-destructuring
  }

  const simplified = simplify(tokens);

  return {
    tokens: simplified,
    message
  };
}
