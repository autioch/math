import { h } from 'preact';

import './styles';

export default function View({ message }) {
  return (
    <div className={message.length ? 'is-visible' : 'is-hidden'}>{message}</div>
  );
}
