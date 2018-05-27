import { convert, generate, solve, parse } from '../core';
import parseNearley from '../core.nearley/parse';

function filterEmpty(arr) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  const filtered = arr.filter((item) => !Array.isArray(item) || item.length > 0);

  if (filtered.length === 1) {
    return filterEmpty(filtered[0]);
  }

  return filtered.map((item) => filterEmpty(item));
}

export default {

  setState({ data }) {
    return data;
  },

  setMode({ data }) {
    return {
      mode: data
    };
  },

  setExpression({ data }) {
    return {
      expressionText: data
    };
  },

  generate({ state }) {
    const { maximum, minimum, complexity } = state;
    let value = maximum + 1;
    let expressionText = '';

    while (minimum > value || value > maximum) {
      expressionText = generate(complexity).join('');
      value = solve(convert.toRpn(parse(expressionText).expression));
    }

    return {
      expressionText
    };
  },

  solve({ state: { expressionText, historyList } }) {
    const { message, tokens } = parseNearley(expressionText);

    if (message) {
      return {
        expressionText,
        rnpExpression: [],
        steps: [],
        message,
        value: null
      };
    }

    const newHistory = historyList.filter((item) => item.expressionText !== expressionText);
    const steps = filterEmpty(tokens);

    newHistory.unshift({
      expressionText,
      timestamp: new Date().toLocaleTimeString()
    });

    return {
      expressionText,
      message: '',
      steps,
      historyList: newHistory
    };
  }
};
