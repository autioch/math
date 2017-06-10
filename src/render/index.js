import markupsvg from './markupsvg.html';
import setSteps from './setSteps';


export default function render(solved, container) {
  container.html(markupsvg(solved));
  setSteps(container);
}
