/* eslint no-magic-numbers: 0 */

export default {
  expressionText: '',
  historyList: [],
  message: '',
  steps: [],
  value: null,

  /* Generate */
  minimum: 0,
  maximum: 100,
  complexity: 6,

  /* Accordion */
  mode: 'generate',
  modes: {
    result: 'result',
    steps: 'steps',
    generate: 'generate',
    history: 'history'
  }
};
