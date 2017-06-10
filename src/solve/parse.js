import operators from './operators';

const ALL_OPERATORS = Object.keys(operators).concat(['(', ')']);

const RX_WHITE_SPACE = /\s+/g;
const RX_DIVISON = /\:/g;
const RX_OPERATORS = new RegExp('([' + ALL_OPERATORS.map(key => '\\' + key).join('') + '])');

function sanitize(raw) {
  return raw
    .replace(RX_WHITE_SPACE, '')
    .replace(RX_DIVISON, '/')
    .split(RX_OPERATORS)
    .filter(item => item !== '');
}

function tokenize(sanitized) {
  return sanitized.map((token, index) => ({
    id: index,
    value: token
  }));
}

export default function parse(raw) {
  return tokenize(sanitize(raw));
}
