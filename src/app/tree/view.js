import React from 'react';
import './styles.css';

// import StepView from './step/view';

export default function Tree({ steps, value }) {
  return (
    <div className="m-tree">
      <div className="m-tree__value">Solution: {value}</div>
      <pre>{JSON.stringify(steps, null, '  ')}</pre>
      {

      /* {steps.map((step, index) => <StepView step={step} key={index}/>)} */
      }
    </div>
  );
}
