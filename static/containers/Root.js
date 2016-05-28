import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from './App';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
