/* global module */
module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    indent: [
      'error',
      2
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ]
  }
};
