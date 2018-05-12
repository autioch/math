import App from './app';
import actions from './actions';
import initialState from './initialState';
import { createApp } from 'pipe-and-gauge';

const store = createApp(actions, initialState, App, document.querySelector('#root'));

store.setExpression('11+3* 2 + 3+9*6-3-7*5');
