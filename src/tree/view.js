import React from 'react';

// import _ from 'lodash';
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

export default function TreeView({ steps, paths, treeHeight, treeWidth }) {
  const rects = {};

  steps.forEach(({ items }) => {
    items.forEach((item) => {
      rects[item.id] = item;
    });
  });

  return (
    <div className="m-tree" style={{
      height: treeHeight,
      width: treeWidth
    }}>
      <svg
        className="m-tree__paths"
        version="1.1"
        width={treeWidth}
        height={treeHeight}
        viewBox={`0 0 ${treeWidth} ${treeHeight}`}
      >
        {paths
          .filter((path) => rects[path.from] && rects[path.to])
          .map(({ from, to }, index) => <line
            y1 ={rects[from].bottom}
            x1={rects[from].left + (rects[from].width / 2)}
            y2={rects[to].top}
            x2={rects[to].left + (rects[to].width / 2)}
            from-id={from}
            to-id={to}
            className="m-tree__path"
            key={index}
          />)}
      </svg>
      {steps.map((step, index) => <Step step={step} key={index} />)}
    </div>
  );
}
