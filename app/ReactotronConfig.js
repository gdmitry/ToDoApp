import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import DeviceInfo from 'react-native-device-info';

const isRealDevice = DeviceInfo.getModel() === 'Moto G (4)';

// Configure Reactotron
Reactotron
  .configure({
    name: 'App',
    host: isRealDevice ? 'localhost' : '10.0.2.2', // need to have different ips for emulator and device
    port: 9090
  })
  .use(reactotronRedux())
  .useReactNative()
  .connect();

Reactotron.clear();
console.tron = Reactotron;
