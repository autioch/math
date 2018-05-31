import grammar from './grammar';
import { Parser } from 'nearley';
import { flattenDeep } from 'lodash';

const RX_WHITE_SPACE = /\s+/g;

function parse(item, index) {
  const value = parseFloat(item);
  const isNumber = !isNaN(value);

  return {
    id: index,
    type: item.type,
    isNumber,
    value: isNumber ? value : item.value
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

  const flat = flattenDeep(tokens);
  const parsed = flat.map(parse);

  return {
    tokens: parsed,
    message
  };
}
