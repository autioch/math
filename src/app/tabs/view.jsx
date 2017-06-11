const { h } = require('preact');
const modes = require('../modes');
const ItemView = require('./item/view');

require('./styles');

const modeArray = Object.keys(modes).map((key) => modes[key]);

module.exports = function TabsView({ setMode, currentMode }) {
  return (
    <div className="m-tabs">
      {modeArray.map((item) => <ItemView key={item.key} item={item} setMode={setMode} currentMode={currentMode}/>)}
    </div>
  );
};
