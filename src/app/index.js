import React from 'react';
import { Button, Input, Collapse } from 'antd';
import HistoryView from './history/view';
import MessageView from './message/view';
import TreeView from './tree/view';

import './styles.css';

const { Panel } = Collapse;

export default function App({
  state: { modes, mode, expressionText, historyList, message, steps, value },
  store: { setMode, setExpression, generate, solve }
}) {
  return (
    <div>
      <div className="expression">
        <Input
          placeholder="2+3"
          onPressEnter={solve}
          defaultValue={expressionText}
          value={expressionText}
          onChange={(ev) => setExpression(ev.target.value)}
        />
        <Button icon="play-circle-o" type="primary" onClick={solve}></Button>
      </div>
      <MessageView message={message} />
      <Collapse accordion onChange={setMode} activeKey={mode}>
        <Panel header="Result" key={modes.result}>
          {value}
        </Panel>
        <Panel header="Steps" key={modes.steps}>
          <TreeView steps={steps} value={value} />
        </Panel>
        <Panel header="Generate" key={modes.generate}>
          <Button icon="reload" type="primary" onClick={generate}>Generate</Button>
        </Panel>
        <Panel header="History" key={modes.history}>
          <HistoryView historyList={historyList} setExpression={setExpression}/>
        </Panel>
      </Collapse>
    </div>
  );
}
