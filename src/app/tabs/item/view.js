import React from 'react';
import './styles.css';

export default function TabView({ item: { id, label }, setMode, currentMode }) {
  const className = `m-tabs-item ${currentMode === id ? 'is-selected' : ''}`;

  return (
    <div className={className} onClick={() => setMode(id)}>{label}</div>
  );
}
