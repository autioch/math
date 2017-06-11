const { h } = require('preact');

require('./styles');

module.exports = function StepView({ step }) {
  return (
    <div>
      <pre>{step.string}</pre>
    </div>
  );
};
