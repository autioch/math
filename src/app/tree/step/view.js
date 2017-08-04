import { h } from 'preact';

import './styles';

export default function StepView({ step }) {
  return (
    <div>
      <pre>{step.string}</pre>
    </div>
  );
}
