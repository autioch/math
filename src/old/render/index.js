import markupsvg from './markupsvg.html';
import setSteps from './setSteps';

export function render(solved, container) {
  container.html(markupsvg(solved));
  setSteps(container);
}
