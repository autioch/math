import { parse, solve, generate, getSteps } from './core';

const HISTORY_COUNT = 15;

export default {

  setMode({ data }) {
    return {
      mode: data
    };
  },

  setMinimum({ data }) {
    return {
      minimum: parseFloat(data)
    };
  },

  setMaximum({ data }) {
    return {
      maximum: parseFloat(data)
    };
  },

  setComplexity({ data }) {
    return {
      complexity: parseInt(data, 10)
    };
  },

  setExpression({ data, state: { mode, modes } }) {
    return {
      expressionText: data,
      mode: mode === modes.result || mode === modes.steps ? undefined : mode,
      message: ''
    };
  },

  generate({ state }) {
    const { maximum, minimum, complexity } = state;
    let value = maximum + 1;
    let expressionText = '';
    let attempts = 0;

    while (attempts < 10 && (minimum > value || value > maximum)) {
      expressionText = generate(complexity);

      const { tokens } = parse(expressionText);

      value = tokens.length ? solve(tokens) : minimum;
      attempts++;
    }

    return {
      expressionText,
      message: ''
    };
  },

  solve({ state: { expressionText, historyList } }) {
    const { message, tokens } = parse(expressionText);

    if (message) {
      return {
        expressionText,
        message,
        steps: [],
        resultHeight: 30,
        value: null
      };
    }

    const historyEntry = {
      expressionText,
      timestamp: new Date().toLocaleTimeString()
    };
    const newHistoryList = [historyEntry]
      .concat(historyList.filter((item) => item.expressionText !== expressionText))
      .slice(0, HISTORY_COUNT);

    const { steps, paths } = getSteps(tokens);
    const items = steps[0].length;
    const stepHeight = 21;
    const stepBreak = 42;
    const treeWidth = window.innerWidth - 50;
    const treeHeight = (steps.length * (stepHeight + stepBreak)) - stepBreak;
    const itemWidth = Math.floor(treeWidth / items);

    const alignedSteps = steps.map((step, stepIndex) => {
      const stepTop = stepIndex * (stepHeight + stepBreak);

      step.forEach((item, itemIndex) => {
        item.left = itemIndex * itemWidth;
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

    return {
      expressionText,
      message: '',
      steps: alignedSteps,
      paths,
      stepHeight,
      stepBreak,
      treeHeight,
      treeWidth,
      value: solve(tokens),
      historyList: newHistoryList
    };
  }
};
