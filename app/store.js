import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';
import 'rxjs';

import reducers from '../app/reducers/index';
import epics from '../app/epics/index';

let store = null;

const epicMiddleware = createEpicMiddleware();
const middlewares = [
  thunk,
  epicMiddleware
];

// check here if it is DEV mode
if (false) {
  store = Reactotron.createStore(reducers, applyMiddleware(...middlewares));
} else {
  store = createStore(reducers, applyMiddleware(...middlewares));
}


export default store;