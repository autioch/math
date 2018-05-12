import React from 'react';
import './styles.css';

export default function Message({ message }) {
  return (
    <div className={message.length ? 'is-visible' : 'is-hidden'}>{message}</div>
  );
}
