import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/(:palette)" component={App} />
    </Router>
  </Provider>
);

export default Root;
