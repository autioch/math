/* eslint no-magic-numbers: 0 */

export default {
  expressionText: '',
  historyList: [],
  message: '',
  steps: [],
  value: null,
  minimum: 0,
  maximum: 100,
  complexity: 6,
  mode: 'generate',
  modes: {
    result: 'result',
    steps: 'steps',
    generate: 'generate',
    history: 'history'
  }
};
