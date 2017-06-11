  const normalize = require('./normalize');
  const tokenize = require('./tokenize');

  module.exports = function parse(text) {
    const { error, expression } = normalize(text);

    if (error) {
      return {
        error
      };
    }

    return {
      expression: tokenize(expression)
    };
  };
