import React from 'react';
import './styles.css';
import ItemView from './item/view';

export default function HistoryList({ historyList, setExpression }) {
  return (
    <div className="m-history">
      {historyList.map((item, index) => <ItemView key={index} item={item} setExpression={setExpression}/>)}
    </div>
  );
}
