import React from 'react';
import { Button, Input, InputNumber, Collapse } from 'antd';
import HistoryView from './history/view';
import MessageView from './message/view';
import TreeView from './tree/view';

import './styles.css';

const { Panel } = Collapse;

export default function App({
  state: { modes, mode, expressionText, historyList, message, steps, value, complexity, minimum, maximum },
  store: { setMode, setExpression, generate, solve, setMinimum, setMaximum, setComplexity }
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
          {value}
        </Panel>
        <Panel header="Steps" key={modes.steps}>
          <TreeView steps={steps} />
        </Panel>
        <Panel header="Generate" key={modes.generate}>
          <Button icon="reload" type="primary" onClick={generate}>Generate</Button>
          <div className="flex-row">
            <span className="flex-row__header">Complexity</span>
            <InputNumber value={complexity} defaultValue={complexity} onChange={setComplexity} />
          </div>
          <div className="flex-row">
            <span className="flex-row__header">Minimum value</span>
            <InputNumber value={minimum} defaultValue={minimum} onChange={setMinimum} />
          </div>
          <div className="flex-row">
            <span className="flex-row__header">Maximum value</span>
            <InputNumber value={maximum} defaultValue={maximum} onChange={setMaximum} />
          </div>
        </Panel>
        <Panel header="History" key={modes.history}>
          <HistoryView historyList={historyList} setExpression={setExpression}/>
        </Panel>
      </Collapse>
    </div>
  );
}
