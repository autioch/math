import React from 'react';
import './styles.css';

export default function HistoryItem({ item: { timestamp, expressionText }, setExpression }) {
  return (
    <div className="m-history-item" onClick={() => setExpression(expressionText)}>
      <div className="m-history-item__text">{expressionText}</div>
      <div className="m-history-item__timestamp">{timestamp}</div>
    </div>
  );
}
