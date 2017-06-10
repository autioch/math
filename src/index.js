import debounce from 'lodash.debounce';
import app from './app';
import './styles/index';

[{
  el: 'solve',
  ev: 'click',
  handler: app.solveAndRender
}, {
  el: 'generate',
  ev: 'click',
  handler: app.setGenerated
}, {
  el: 'complexity',
  ev: 'keyup change',
  handler: app.updateComplexity
}, {
  el: 'minimum',
  ev: 'keyup change',
  handler: app.updateMinimum
}, {
  el: 'maximum',
  ev: 'keyup change',
  handler: app.updateMaximum
}].forEach(function(eventDefinition) {
  let handler = eventDefinition.handler;
  eventDefinition.ev.split(' ').forEach(function(ev) {
    if (ev === 'keyup') {
      handler = debounce(handler, 1000);
    }
    app.ui[eventDefinition.el].on(ev, handler);
  });
});
