import React from 'react';
import RandomView from './random/view';
import CustomView from './custom/view';
import HistoryView from './history/view';
import TabsView from './tabs/view';
import TreeView from './tree/view';
import MessageView from './message/view';
import './styles.css';

export default function App({
  state: { modes, mode, historyList, expressionText, message, steps, value },
  store: { setMode, setExpression, generate, solve }
}) {
  const MODEVIEWS = {
    [modes.random.id]: RandomView,
    [modes.custom.id]: CustomView,
    [modes.history.id]: HistoryView
  };
  const ModeView = MODEVIEWS[mode];

  return (
    <div>
      <TabsView modes={modes} setMode={setMode} currentMode={mode} />
      <MessageView message={message} />
      <div className="m-mode">
        <ModeView
          setExpression={setExpression}
          generate={generate}
          historyList={historyList}
          expressionText={expressionText}
        />
      </div>
      <div><span onClick={solve}>Solve</span></div>
      <TreeView steps={steps} value={value} />
    </div>
  );
}
