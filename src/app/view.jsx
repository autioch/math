/* eslint no-magic-numbers: 0 */
const { h, Component } = require('preact');
const { convert: { toRpn }, generate, parse, solve, steps } = require('core');
const RandomView = require('./random/view');
const CustomView = require('./custom/view');
const HistoryView = require('./history/view');
const TabsView = require('./tabs/view');
const TreeView = require('./tree/view');
const MessageView = require('./message/view');
const modes = require('./modes');

const MODEVIEWS = {
  [modes.random.key]: RandomView,
  [modes.custom.key]: CustomView,
  [modes.history.key]: HistoryView
};

module.exports = class AppView extends Component {
  constructor() {
    super();
    this.state = {
      minimum: 0,
      maximum: 100,
      complexity: 6,
      expressionText: '',
      historyList: [],
      rnpExpression: [],
      steps: [],
      value: null,
      error: '',
      mode: modes.random.key
    };

    this.setCustom = this.setCustom.bind(this);
    this.setExpression = this.setExpression.bind(this);
    this.setRandom = this.setRandom.bind(this);
    this.setMode = this.setMode.bind(this);
    this.setExpression('(11+3* 2 + 3)+9*6-3-7*5');
  }

  setCustom(userExpression) {
    this.setExpression(userExpression);
  }

  setRandom() {
    const { maximum, minimum, complexity } = this.state;
    let value = maximum + 1;
    let expression = '';

    while (minimum > value || value > maximum) {
      expression = generate(complexity).join('');
      value = solve(toRpn(parse(expression).expression));
    }

    this.setExpression(expression);
  }

  setExpression(expressionText) {
    const { error, expression } = parse(expressionText);

    if (error) {
      this.setState({
        expressionText,
        rnpExpression: [],
        steps: [],
        error,
        value: null
      });

      return;
    }

    const rnpExpression = toRpn(expression);
    const newHistory = this.state.historyList.filter((item) => item.expressionText !== expressionText);

    const value = solve(rnpExpression);

    newHistory.unshift({
      expressionText,
      timestamp: new Date()
    });

    this.setState({
      expressionText,
      rnpExpression,
      steps: steps(rnpExpression),
      error: '',
      value,
      historyList: newHistory
    });
  }

  setMode(mode) {
    this.setState({
      mode
    });
  }

  render() {
    const ModeView = MODEVIEWS[this.state.mode];

    return (
      <div>
        <TabsView setMode={this.setMode} />
        <MessageView message={this.state.error} />
        <ModeView
          setExpression={this.setExpression}
          setCustom={this.setCustom}
          setRandom={this.setRandom}
          historyList={this.state.historyList}
          setMode={this.setMode}
          expressionText={this.state.expressionText}
        />
        <TreeView rnpExpression={this.state.rnpExpression} value={this.state.value} />
      </div>
    );
  }
};
