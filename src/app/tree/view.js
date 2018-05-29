import React from 'react';
import './styles.css';

// import StepView from './step/view';
function Expression({ exp }) {
  if (Array.isArray(exp)) {
    return (
      <div className="m-tree__steps">
        {exp.map((item, index) => <Expression exp={item} key={index} />)}
      </div>
    );
  }

  return (
    <div className="m-tree__steps">
      {exp.value === null ? exp.type : exp.value}
    </div>
  );
}

export default function Tree({ steps, value }) {
  return (
    <div className="m-tree">
      <div className="m-tree__value">Solution: {value}</div>
      <Expression exp={steps} />
    </div>
  );
}
