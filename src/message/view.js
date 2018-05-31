import React from 'react';
import { Alert } from 'antd';
import './styles.css';

export default function Message({ message }) {
  return (
    <div className={message && message.length ? '' : 'is-hidden'}>
      <Alert message={message} type="error" />
    </div>
  );
}
