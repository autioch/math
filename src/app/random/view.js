import React from 'react';
import './styles.css';

export default function Random({ generate }) {
  return (
    <div className="m-random">
      <button className="m-random__button" onClick={generate}>Generate</button>
    </div>
  );
}
