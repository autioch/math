module.exports = {
  extends: [
    'react-app',
    'qb',
  ],
  rules: {
    'id-blacklist': ['off'],
    'id-length': ['off'],
    'no-magic-numbers': ['off'],
    'no-console': ['off'],
    'no-plusplus': ['off'],
    'no-undefined': ['off'],
    'no-use-before-define': ['error', { "functions": false }]
  }
};
