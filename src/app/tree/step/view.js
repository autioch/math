import React from 'react';
import './styles.css';

export default function TreeStep({ step }) {
  return (
    <div>
      <pre>{step.string}</pre>
    </div>
  );
}
