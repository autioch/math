const config = require('./config');
const $ = require('jquery');
const MathApp = require('./mathApp');

const mathApp = new MathApp(config);

const ui = {};

['expression', 'solve', 'generate', 'minimum', 'maximum', 'complexity', 'solution', 'history']
  .forEach((key) => {
    ui[key] = $(`.js-${key}`);
  });

function updateMaximum(ev) {
  mathApp.settings.maximum = ev.target.value;
}

function updateMinimum(ev) {
  mathApp.settings.minimum = ev.target.value;
}

function updateComplexity(ev) {
  mathApp.settings.complexity = ev.target.value;
}

function setGenerated() {
  mathApp.generate();
  ui.expression.val(mathApp.expressionText);
  ui.solution.empty();
}

function solveAndRender() {
  mathApp.setCustom(ui.expression.val());

  // render(mathApp);
  // ui.history.append(`<div class="history-list__item">${expression}</div>`);
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
