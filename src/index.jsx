const { render, h } = require('preact');
const AppView = require('./app/view');

require('./styles');

render(<AppView />, document.body);
