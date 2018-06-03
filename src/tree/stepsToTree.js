import _ from 'lodash';

const { keyBy } = _;

function getItemPaths(toItem, previousStep) {
  const fromItems = toItem.solvedFrom.map((fromId) => previousStep.dict[fromId]);

  return fromItems

    /* TODO There might be items that are "solvedFrom" in previous steps. */
    .filter((fromItem) => !!fromItem)
    .map((fromItem) => ({
      y1: fromItem.bottom + 2,
      x1: fromItem.left + (fromItem.width / 2),
      y2: toItem.top - 2,
      x2: toItem.left + (toItem.width / 2)
    }));
}

function getPaths(alignedSteps) {
  const paths = [];

  for (let i = 1; i < alignedSteps.length; i++) {
    const previousStep = alignedSteps[i - 1];
    const currentStep = alignedSteps[i];
    const toItems = currentStep.items.filter((item) => item.solvedFrom);

    toItems.forEach((toItem) => {
      const itemPaths = getItemPaths(toItem, previousStep);

      paths.push(...itemPaths);
    });
  }

  return paths;
}

function getAlignedSteps(steps, treeWidth, stepHeight, stepPadding) {
  const maxItemWidth = 30;
  const itemCount = steps[0].length;
  const itemWidth = Math.min(maxItemWidth, Math.floor(treeWidth / itemCount));

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
      items: step,
      dict: keyBy(step, 'id')
    };
  });

  return alignedSteps;
}

export default function stepsToTree(steps) {
  const stepCount = steps.length;
  const stepHeight = 21;
  const stepPadding = 21;

  const treeWidth = window.innerWidth - 50;
  const treeHeight = (stepCount * (stepHeight + stepPadding)) - stepPadding;

  const alignedSteps = getAlignedSteps(steps, treeWidth, stepHeight, stepPadding);
  const paths = getPaths(alignedSteps);

  return {
    steps: alignedSteps,
    paths,
    size: {
      width: treeWidth,
      height: treeHeight
    }
  };
}
