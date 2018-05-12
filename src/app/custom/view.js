import React from 'react';
import './styles.css';

export default function Custom({ setExpression, expressionText }) {
  return (
    <div className="m-custom">
      <label className="m-custom__input">
        <div className="m-custom__label">Enter expression:</div>
        <input
          type="text"
          className="m-custom__field"
          value={expressionText}
          onChange={(ev) => setExpression(ev.target.value)}
        />
      </label>
    </div>
  );
}
