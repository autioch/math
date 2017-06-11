const { h } = require('preact');

require('./styles');

module.exports = function View({ message }) {
  return (
    <div className={message.length ? 'is-visible' : 'is-hidden'}>{message}</div>
  );
};
