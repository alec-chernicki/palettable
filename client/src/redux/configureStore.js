// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from './reducers/rootReducer';
import { rootEpic } from './epics/rootEpic';

const epicMiddleware = createEpicMiddleware(rootEpic);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
};

export default configureStore;
