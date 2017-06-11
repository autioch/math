const { h } = require('preact');

require('./styles');

module.exports = function TabView({ item: { key, label }, setMode }) {
  return (
    <div onclick={() => setMode(key)}>{label}</div>
  );
};
