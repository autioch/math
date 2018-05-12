import { h } from 'preact';

import './styles';

export default function View({ item: { timestamp, expressionText }, setExpression }) {
  return (
    <div className="m-history-item" onclick={() => setExpression(expressionText)}>
      <div className="m-history-item__text">{expressionText}</div>
      <div className="m-history-item__timestamp">{timestamp.toString()}</div>
    </div>
  );
}
