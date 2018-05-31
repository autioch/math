import React from 'react';
import { Button, InputNumber } from 'antd';

export default function Generate({
  state: { complexity, minimum, maximum },
  store: { generate, setMinimum, setMaximum, setComplexity }
}) {
  return (
    <div>
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
    </div>
  );
}
