import React from 'react';
import { Button, Input, Collapse } from 'antd';
import HistoryView from './history/view';
import MessageView from './message/view';
import TreeView from './tree/view';
import Generate from './generate';

import './styles.css';

const { Panel } = Collapse;

export default function App({
  state, store,
  state: { modes, mode, expressionText, historyList, message, tree },
  store: { setMode, setExpression, solve }
}) {
  return (
    <div>
      <div className="flex-row">
        <Input
          size="large"
          placeholder="2+3"
          onPressEnter={solve}
          defaultValue={expressionText}
          value={expressionText}
          onChange={(ev) => setExpression(ev.target.value)}
        />
        <Button size="large" icon="play-circle-o" type="primary" onClick={solve}>Solve</Button>
      </div>
      <MessageView message={message} />
      <Collapse accordion onChange={setMode} activeKey={mode}>
        <Panel header="Result" key={modes.result}>
          <TreeView tree={tree} />
        </Panel>
        <Panel header="Generate" key={modes.generate}>
          <Generate state={state} store={store}/>
        </Panel>
        <Panel header="History" key={modes.history}>
          <HistoryView historyList={historyList} setExpression={setExpression}/>
        </Panel>
      </Collapse>
    </div>
  );
}
