const { h } = require('preact');

require('./styles');

module.exports = function View({ expressionText, setRandom }) {
  return (
    <div className="m-random">
      <div>{expressionText}</div>
      <button onclick={setRandom}>Generate</button>
    </div>
  );
};
