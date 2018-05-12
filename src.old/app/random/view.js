import { Component, h } from 'preact';

import './styles';

export default class RandomView extends Component {
  render() {
    return (
      <div className="m-random">
        <button className="m-random__button" onclick={this.props.setRandom}>Generate and solve</button>
        <div className="m-random__value">{this.props.expressionText}</div>
        <button className="m-random__button" onclick={this.props.setRandom}>Generate and solve</button>
      </div>
    );
  }
}
