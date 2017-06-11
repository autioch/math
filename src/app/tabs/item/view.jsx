const { h } = require('preact');

require('./styles');

module.exports = function TabView({ item: { key, label }, setMode, currentMode }) {
  const className = `m-tabs-item ${currentMode === key ? 'is-selected' : ''}`;

  return (
    <div className={className} onclick={() => setMode(key)}>{label}</div>
  );
};
