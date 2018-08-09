import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';
import DeviceInfo from 'react-native-device-info';

const isRealDevice = DeviceInfo.getModel() === 'Moto G (4)';

Reactotron
  .configure({
    name: 'App',
    host: isRealDevice ? 'localhost' : '10.0.2.2', // need to have different ips for emulator and device
    port: 9090
  })
  .use(sagaPlugin())
  .use(reactotronRedux())
  .useReactNative()
  .connect();

Reactotron.clear();
console.tron = Reactotron;
