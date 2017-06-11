const { h } = require('preact');
const ItemView = require('./item/view');

require('./styles');

module.exports = function HistoryView({ historyList, setExpression }) {
  return (
    <div className="m-history">
      {historyList.map((item, index) => <ItemView key={index} item={item} setExpression={setExpression}/>)}
    </div>
  );
};
