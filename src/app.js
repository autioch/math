const generate = require('./generator');
const config = require('./config');
const render = require('./render');
const solve = require('./solve');
const $ = require('jquery');

const ui = {};

['expression', 'solve', 'generate', 'minimum', 'maximum', 'complexity', 'solution', 'history']
  .forEach((key) => ui[key] = $(`.js-${key}`));

function updateMaximum(ev) {
  const value = ev.target.value;

  if (value <= config.minimum) {
    return alert('Maximum must be greater than minimum.');
  }
  config.maximum = value;
}

function updateMinimum(ev) {
  const value = ev.target.value;

  if (value >= config.maximum) {
    return alert('Minimum must be smaller than maximum.');
  }
  config.minimum = value;
}

function updateComplexity(ev) {
  const value = ev.target.value;

  if (value < 1 || value > 50) {
    return alert('Complexity must be between 1 and 50.');
  }
  config.complexity = value;
}

function setGenerated() {
  let total = config.maximum + 1;
  let expression = '';

  while (total > config.maximum || total < config.minimum) {
    expression = generate(config.complexity).join('');
    total = solve(expression).value;
  }
  ui.expression.val(expression);
  ui.solution.empty();
}

function solveAndRender() {
  const expression = ui.expression.val();
  const solved = solve(expression);

  render(solved, ui.solution);
  ui.history.append(`<div class="history-list__item">${expression}</div>`);
}

ui.expression.val('(11+3* 2 + 3)+9*6-3-7*5');
ui.complexity.val(config.complexity);
ui.minimum.val(config.minimum);
ui.maximum.val(config.maximum);

module.exports = {
  ui,
  updateMinimum,
  updateMaximum,
  updateComplexity,
  setGenerated,
  solveAndRender
};
