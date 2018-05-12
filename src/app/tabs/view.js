import React from 'react';
import './styles.css';
import ItemView from './item/view';

export default function TabsView({ modes, setMode, currentMode }) {
  return (
    <div className="m-tabs">
      {Object.values(modes).map((item) => <ItemView
        key={item.id}
        item={item}
        setMode={setMode}
        currentMode={currentMode}
      />)}
    </div>
  );
}
