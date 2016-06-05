import markupsvg from './markupsvg.html';
import template from 'lodash.template';
import setSteps from './setSteps';

const compiledTemplateSvg = template(markupsvg);

export default function render(solved, container) {
  container.html(compiledTemplateSvg(solved));
  setSteps(container);
}
