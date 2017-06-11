const { convert: { toRpn }, generate, parse, solve, steps } = require('core');

/* eslint no-magic-numbers: 0 */
const DEFAULTS = {
  minimum: 0,
  maximum: 100,
  complexity: 6
};

module.exports = class ExpressionApp {
  constructor(settings) {
    this.settings = Object.assign({}, DEFAULTS, settings);
    this.history = [];
    this.expressionText = '(11+3* 2 + 3)+9*6-3-7*5';
  }

  setCustom(userExpression) {
    this.setExpression(userExpression);
  }

  generate() {
    let value = this.settings.maximum + 1;
    let expression = '';

    while (this.settings.minimum > value || value > this.settings.maximum) {
      expression = generate(this.settings.complexity).join('');
      value = solve(toRpn(parse(expression)));
    }

    this.setExpression(expression);
  }

  getValue() {
    return solve(this.rnpExpression);
  }

  setExpression(expressionText) {
    this.expressionText = expressionText;
    this.rnpExpression = toRpn(parse(expressionText));
    this.steps = steps(this.rnpExpression);
    this.history = this.history.filter((item) => item.text !== expressionText);
    this.history.unshift({
      expressionText,
      timestamp: new Date()
    });
  }
};
