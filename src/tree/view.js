import React from 'react';
import './styles.css';

function Item({ item }) {
  return (
    <div className="m-item" item-id={item.id} style={{
      left: item.left,
      width: item.width
    }}>
      {item.value}
    </div>
  );
}

function Step({ step }) {
  return (
    <div className="m-step" style={{
      top: step.top
    }}>
      {step.items.map((item, index) => <Item key={index} item={item} />)}
    </div>
  );
}

export default function TreeView({ tree: { steps, paths, size } }) {
  return (
    <div className="m-tree" style={{
      ...size
    }}>
      <svg className="m-tree__paths" version="1.1" {...size} viewBox={`0 0 ${size.width} ${size.height}`} >
        {paths.map((path, index) => <line {...path} className="m-tree__path" key={index} />)}
      </svg>
      {steps.map((step, index) => <Step step={step} key={index} />)}
    </div>
  );
}
