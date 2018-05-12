/* eslint no-magic-numbers: 0 */

export default {
  mode: 1,
  modes: {
    random: {
      id: 1,
      label: 'Random'
    },
    custom: {
      id: 2,
      label: 'Custom'
    },
    history: {
      id: 3,
      label: 'History'
    }
  },
  expressionText: '',
  historyList: [],
  message: '',
  steps: [],
  value: null,
  minimum: 0,
  maximum: 100,
  complexity: 6
};
