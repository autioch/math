const { h } = require('preact');
const StepView = require('./step/view');

require('./styles');

module.exports = function TreeView({ steps, value }) {
  return (
    <div className="m-tree">
      <div className="m-tree__value">Solution: {value}</div>
      {steps.map((step) => <StepView step={step}/>)}
    </div>
  );
};
