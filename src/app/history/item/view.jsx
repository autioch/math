const { h } = require('preact');

require('./styles');

module.exports = function View({ item: { timestamp, expressionText }, setExpression }) {
  return (
    <div className="m-history-item" onclick={() => setExpression(expressionText)}>
      <div className="m-history-item__text">{expressionText}</div>
      <div className="m-history-item__timestamp">{timestamp}</div>
    </div>
  );
};
