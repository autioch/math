import { parse, solve, generate, getSteps } from './core';
import stepsToTree from './tree/stepsToTree';
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

  setError({ data }) {
    return {
      message: data,
      steps: [],
      resultHeight: 30,
      value: null
    };
  },

  addHistory({ data, state: { historyList } }) {
    const entry = {
      expressionText: data,
      timestamp: new Date().toLocaleTimeString()
    };

    const newHistoryList = [entry]
      .concat(historyList.filter((item) => item.expressionText !== data))
      .slice(0, HISTORY_COUNT);

    return {
      historyList: newHistoryList
    };
  },

  setResults({ data: tokens }) {
    const steps = getSteps(tokens);
    const value = solve(tokens);
    const tree = stepsToTree(steps);

    return {
      message: '',
      value,
      tree
    };
  },

  solve({ store, state: { expressionText } }) {
    const { message, tokens } = parse(expressionText);

    if (message) {
      store.setError(message);
    } else {
      store
        .addHistory(expressionText)
        .setResults(tokens);
    }
  }
};
