import React from 'react';
import './styles.css';

// import StepView from './step/view';
function Expression({ exp }) {
  if (Array.isArray(exp)) {
    return (
      exp.map((item, index) => <Expression exp={item} key={index} />)
    );
  }

  return (
    <span className="m-tree__item">
      {exp.value === null ? exp.type : exp.value}
    </span>
  );
}

export default function Tree({ steps }) {
  return (
    <div className="m-tree">
      <Expression exp={steps} />
    </div>
  );
}
