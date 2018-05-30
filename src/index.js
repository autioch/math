import App from './app';
import actions from './actions';
import initialState from './initialState';
import { createApp } from 'pipe-and-gauge';
import 'antd/dist/antd.css';
import { diff } from 'deep-object-diff';

const store = createApp(actions, initialState, App, document.querySelector('#root'));

let previousState = {
  ...store.getState()
};

store.subscribe(({ state }) => {
  const difference = diff(state, previousState);

  console.log(difference); // eslint-disable-line no-console
  previousState = {
    ...state
  };
});

store.setExpression('11+3* 2 + 3+9*6-3-7*5');
