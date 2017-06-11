  const normalize = require('./normalize');
  const tokenize = require('./tokenize');

  module.exports = function parse(text) {
    return tokenize(normalize(text));
  };
