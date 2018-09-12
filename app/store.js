import 'rxjs';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import Reactotron from 'reactotron-react-native';

import reducers from './reducers/index';
import epics from './epics/index';

// eslint-disable-line import/no-mutable-exports
let store = null;

const epicMiddleware = createEpicMiddleware();
const middlewares = [
  thunk,
  epicMiddleware
];

// check here if it is DEV mode
if (true) {
  store = Reactotron.createStore(reducers, applyMiddleware(...middlewares));
} else {
  store = createStore(reducers, applyMiddleware(...middlewares));
}

epicMiddleware.run(epics);

export default store;
