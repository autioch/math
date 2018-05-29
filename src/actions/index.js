import { generate } from '../core';
import parseNearley from '../core.nearley/parse';
import solveNearley from '../core.nearley/solve';

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

      // solve(convert.toRpn(parse(expressionText).expression));
      value = '1';
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
        message,
        steps: [],
        value: null
      };
    }

    const value = solveNearley(tokens);
    const newHistoryList = [{
      expressionText,
      timestamp: new Date().toLocaleTimeString()
    }].concat(historyList.filter((item) => item.expressionText !== expressionText));

    return {
      expressionText,
      message: '',
      steps: tokens,
      value,
      historyList: newHistoryList
    };
  }
};
