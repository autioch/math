const { h } = require('preact');

require('./styles');

module.exports = function View({ rnpExpression, value }) {
  return (
    <div>
      <div className="">{rnpExpression.map((token) => token.value).join('')}</div>
      <div>{value}</div>
    </div>
  );
};
