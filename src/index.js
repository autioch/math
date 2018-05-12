import App from './components/App';
import actions from './actions';
import initialState from './initialState';
import { createApp } from 'pipe-and-gauge';

const store = createApp(actions, initialState, App, document.querySelector('#root'));

store.start();
