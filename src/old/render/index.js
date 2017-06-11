const markupsvg = require('./markupsvg.html');
const setSteps = require('./setSteps');

module.exports = function render(solved, container) {
  container.html(markupsvg(solved));
  setSteps(container);
};
