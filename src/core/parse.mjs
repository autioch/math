import grammar from './grammar/grammar';
import nearley from 'nearley';

const { Parser } = nearley;

const RX_WHITE_SPACE = /\s+/g;
let nextId = 1;

function parse(arr) {
  if (!Array.isArray(arr)) {
    const value = parseFloat(arr.value);

    return {
      id: nextId++,
      type: arr.type,
      value: isNaN(value) ? arr.value : value
    };
  }

  const filtered = arr.filter((item) => !Array.isArray(item) || item.length > 0);

  if (filtered.length === 1) {
    return parse(filtered[0]);
  }

  return filtered.map((item) => parse(item));
}

export default function tokenize(text) {
  nextId = 1;
  const charsOnly = text.trim().replace(RX_WHITE_SPACE, '');

  let results = [];
  let message = '';

  try {
    results = new Parser(grammar).feed(charsOnly).results; // eslint-disable-line prefer-destructuring
  } catch (err) {
    message = err.message; // eslint-disable-line prefer-destructuring
  }

  return {
    tokens: parse(results[0] || []),
    isAmbiguous: results.length > 1,
    message
  };
}
