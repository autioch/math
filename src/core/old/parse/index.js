import normalize from './normalize';
import tokenize from './tokenize';

export default function parse(text) {
  const { error, expression } = normalize(text);

  if (error) {
    return {
      error
    };
  }

  return {
    expression: tokenize(expression)
  };
}
