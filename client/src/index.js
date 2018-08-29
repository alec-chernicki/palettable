// @flow
import 'react-tippy/dist/tippy.css';
import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Raven from 'raven-js';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './App';

const store = configureStore();

Raven.config(
  'https://cf322013a54848f3944b99a00d925647@sentry.io/217790'
).install();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
