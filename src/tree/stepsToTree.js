import _ from 'lodash';

const { flattenDeep } = _;

export default function stepsToTree(steps) {
  const stepCount = steps.length;

  const stepHeight = 21;
  const stepPadding = 42;
  const treeHeight = (stepCount * (stepHeight + stepPadding)) - stepPadding;
  const treeWidth = window.innerWidth - 50;

  const itemCount = steps[0].length;
  const itemWidth = Math.floor(treeWidth / itemCount);

  const paths = flattenDeep(flattenDeep(steps)
    .filter((item) => item.solvedFrom)
    .map((item) => item.solvedFrom.map((from) => ({
      from,
      to: item.id
    }))));

  const alignedSteps = steps.map((step, stepIndex) => {
    const stepTop = stepIndex * (stepHeight + stepPadding);
    const marginLeft = Math.floor((treeWidth - (step.length * itemWidth)) / 2);

    step.forEach((item, itemIndex) => {
      item.left = marginLeft + (itemIndex * itemWidth);
      item.width = itemWidth;
      item.right = item.left + item.width;
      item.top = stepTop;
      item.bottom = item.top + stepHeight;
    });

    return {
      top: stepTop,
      items: step
    };
  });

  const rects = {};

  alignedSteps.forEach(({ items }) => {
    items.forEach((item) => {
      rects[item.id] = item;
    });
  });

  const pathRects = paths
    .filter((path) => rects[path.from] && rects[path.to])
    .map(({ from, to }) => ({
      y1: rects[from].bottom + 2,
      x1: rects[from].left + (rects[from].width / 2),
      y2: rects[to].top - 2,
      x2: rects[to].left + (rects[to].width / 2)
    }));

  return {
    steps: alignedSteps,
    paths: pathRects,
    size: {
      width: treeWidth,
      height: treeHeight
    }
  };
}
