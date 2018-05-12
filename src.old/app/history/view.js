import { h } from 'preact';
import ItemView from './item/view';

import './styles';

export default function HistoryView({ historyList, setExpression }) {
  return (
    <div className="m-history">
      {historyList.map((item, index) => <ItemView key={index} item={item} setExpression={setExpression}/>)}
    </div>
  );
}
