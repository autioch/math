import { h } from 'preact';
import modes from '../modes';
import ItemView from './item/view';

import './styles';

const modeArray = Object.keys(modes).map((key) => modes[key]);

export default function TabsView({ setMode, currentMode }) {
  return (
    <div className="m-tabs">
      {modeArray.map((item) => <ItemView key={item.key} item={item} setMode={setMode} currentMode={currentMode}/>)}
    </div>
  );
}
