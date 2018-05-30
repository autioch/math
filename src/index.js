import App from './app';
import actions from './actions';
import initialState from './initialState';
import { createApp } from 'pipe-and-gauge';
import 'antd/dist/antd.css';
import { diff } from 'deep-object-diff';

const LS_KEY = 'math.state';

/* Restore state from localStorage */
const restoredState = localStorage.getItem(LS_KEY);
const currentState = restoredState ? JSON.parse(restoredState) : initialState;

/* Setup app and store */
const store = createApp(actions, currentState, App, document.querySelector('#root'));

/* Save state in localStorage */
store.subscribe(({ state }) => localStorage.setItem(LS_KEY, JSON.stringify(state)));

/* Logging in the console for debugging. */
let previousState = {};

store.subscribe(({ state }) => {
  console.log(diff(state, previousState));

  previousState = {
    ...state
  };
});

store.setExpression(store.getState().expressionText);
