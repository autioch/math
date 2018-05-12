import compiledGrammar from './compiledGrammar';
import { Parser } from 'nearley';

const RX_WHITE_SPACE = /\s+/g;

export default function parse(text) {
  const charsOnly = text.trim().replace(RX_WHITE_SPACE, '');

  let tokens = [];
  let message = '';

  try {
    tokens = new Parser(compiledGrammar).feed(charsOnly).results;
  } catch (err) {
    message = err.message; // eslint-disable-line prefer-destructuring
  }

  return {
    tokens,
    message
  };
}
