import { createStore, applyMiddleware, compose } from 'redux';
import Reactotron from 'reactotron-react-native';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import reducers from '../app/reducers/index';

let store = null;

if (true) {
  const sagaMonitor = Reactotron.createSagaMonitor();
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

  store = Reactotron.createStore(reducers,  compose(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware)
  ));
} else {
  store = createStore(reducers, applyMiddleware(thunk));
}

export default store;