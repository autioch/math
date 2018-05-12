import { h } from 'preact';
import StepView from './step/view';

import './styles';

export default function TreeView({ steps, value }) {
  return (
    <div className="m-tree">
      <div className="m-tree__value">Solution: {value}</div>
      {steps.map((step) => <StepView step={step}/>)}
    </div>
  );
}
