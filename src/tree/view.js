import React from 'react';
import './styles.css';

function Step({ step }) {
  return (
    <div>
      {step.map((item, index) => <span key={index}>{item.value}</span>)}
    </div>
  );
}

export default function Tree({ steps }) {
  console.log(steps);

  return (
    <div className="m-tree">
      {steps.map((step, index) => <Step step={step} key={index} />)}
    </div>
  );
}
