import React, { PureComponent } from 'react';
import './styles.css';

function Step({ step }) {
  return (
    <div className="m-step">
      {step.map((item, index) => <span className="m-item" key={index} item-id={item.id}>{item.value}</span>)}
    </div>
  );
}

export default class TreeView extends PureComponent {
  render() {
    return (
      <div className="m-tree">
        {this.props.steps.steps.map((step, index) => <Step step={step} key={index} />)}
      </div>
    );
  }
}
