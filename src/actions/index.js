import { generate } from '../core';
import parseNearley from '../core.nearley/parse';
import solveNearley from '../core.nearley/solve';

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

    while (minimum > value || value > maximum) {
      expressionText = generate(complexity).join('');

      // solve(convert.toRpn(parse(expressionText).expression));
      value = '1';
    }

    return {
      expressionText,
      message: ''
    };
  },

  solve({ state: { expressionText, historyList } }) {
    const { message, tokens } = parseNearley(expressionText);

    if (message) {
      return {
        expressionText,
        message,
        steps: [],
        value: null
      };
    }

    const value = solveNearley(tokens);
    const historyEntry = {
      expressionText,
      timestamp: new Date().toLocaleTimeString()
    };
    const newHistoryList = [historyEntry]
      .concat(historyList.filter((item) => item.expressionText !== expressionText))
      .slice(0, HISTORY_COUNT);

    return {
      expressionText,
      message: '',
      steps: tokens,
      value,
      historyList: newHistoryList
    };
  }
};
