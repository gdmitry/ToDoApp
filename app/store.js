import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import Reactotron from 'reactotron-react-native';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import reducers from '../app/reducers/index';
import epics from '../app/epics/index';

let store = null;

const epicMiddleware = createEpicMiddleware();

// check here if it is DEV mode
if (true) {
  const sagaMonitor = Reactotron.createSagaMonitor();
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

  store = Reactotron.createStore(reducers, compose(
    applyMiddleware(thunk),
    applyMiddleware(epicMiddleware),
    applyMiddleware(sagaMiddleware)
  ));
} else {
  store = createStore(reducers, compose(
    applyMiddleware(thunk),
    applyMiddleware(epicMiddleware)
    ));
}

epicMiddleware.run(epics);

export default store;