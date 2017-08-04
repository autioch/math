/* eslint no-magic-numbers: 0 */
import { h, Component } from 'preact';
import { convert, generate, parse, solve, steps } from 'core';
import RandomView from './random/view';
import CustomView from './custom/view';
import HistoryView from './history/view';
import TabsView from './tabs/view';
import TreeView from './tree/view';
import MessageView from './message/view';
import modes from './modes';

import './styles';

const MODEVIEWS = {
  [modes.random.key]: RandomView,
  [modes.custom.key]: CustomView,
  [modes.history.key]: HistoryView
};

export default class AppView extends Component {
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
      value = solve(convert.toRpn(parse(expression).expression));
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

    const rnpExpression = convert.toRpn(expression);
    const newHistory = this.state.historyList.filter((item) => item.expressionText !== expressionText);

    const value = solve(rnpExpression);

    newHistory.unshift({
      expressionText,
      timestamp: new Date().toLocaleTimeString()
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
        <TabsView setMode={this.setMode} currentMode={this.state.mode} />
        <MessageView message={this.state.error} />
        <div className="m-mode">
          <ModeView
            setExpression={this.setExpression}
            setCustom={this.setCustom}
            setRandom={this.setRandom}
            historyList={this.state.historyList}
            setMode={this.setMode}
            expressionText={this.state.expressionText}
          />
        </div>
        <TreeView steps={this.state.steps} value={this.state.value} />
      </div>
    );
  }
}
