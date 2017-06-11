const { h } = require('preact');

require('./styles');

module.exports = function View({ expressionText, setRandom }) {
  return (
    <div className="m-random">
      <button className="m-random__button" onclick={setRandom}>Generate</button>
      <div className="m-random__value">{expressionText}</div>
    </div>
  );
};
