import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga'
import { reactotronRedux } from 'reactotron-redux';

Reactotron
  .configure({
    name: 'App',
    host: '10.0.2.2',
    port: 9090
  })
  .use(sagaPlugin())
  .use(reactotronRedux())
  .useReactNative()
  .connect();

Reactotron.clear()
console.tron = Reactotron
