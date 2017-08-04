import $ from 'jquery';

function getLine(stepRect, fromRect, $containerRect) {
  return $(document.createElementNS('http://www.w3.org/2000/svg', 'line'))
    .attr({
      x1: fromRect.left - $containerRect.left + fromRect.width / 2,
      y1: fromRect.bottom - $containerRect.top,
      x2: stepRect.left - $containerRect.left + stepRect.width / 2,
      y2: stepRect.top - $containerRect.top
    });
}

export function setSteps($container) {
  const mainRect = $container[0].getBoundingClientRect();
  const $items = $container.find('.js-item');
  const $steps = $container.find('.task-step');

  $steps.each((index, step) => {
    const ileft = step.getAttribute('ileft');
    const iright = step.getAttribute('iright');
    const leftRect = $container.find(`.js-item[iid="${ileft}"]`)[0].getBoundingClientRect();
    const rightRect = $container.find(`.js-item[iid="${iright}"]`)[0].getBoundingClientRect();
    const fromX = (leftRect.left + rightRect.right) / 2;

    step.setAttribute('x', fromX - mainRect.left);
    step.setAttribute('y', index * 30 + 40);
    const stepRect = step.getBoundingClientRect();

    $container.append(getLine(stepRect, leftRect, mainRect)).append(getLine(stepRect, rightRect, mainRect));
  });
  $container.attr({
    height: $steps.length * 30 + 40,
    width: $container.find('.task-token').length * 20 + 20
  });
}
