import React from 'react';
import Orientation from 'react-native-orientation';
import { Text, View, Button } from 'react-native';
import styles from './styles/app';

export default class App extends React.Component {
  componentWillMount() {
    // The getOrientation method is async. It happens sometimes that
    // you need the orientation at the moment the JS runtime starts running on device.
    // `getInitialOrientation` returns directly because its a constant set at the
    // beginning of the JS runtime.
 
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
    } else {
      // do something else
    }
  }
 
  componentDidMount() {
    // this locks the view to Portrait Mode
    Orientation.lockToPortrait();
 
    // this locks the view to Landscape Mode
    // Orientation.lockToLandscape();
 
    // this unlocks any previous locks to all Orientations
    // Orientation.unlockAllOrientations();
 
    Orientation.addOrientationListener(this._orientationDidChange);
  }
 
  _orientationDidChange = (orientation) => {
    alert(orientation);
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout
    }
  }
 
  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
 
 
    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from RN!!!</Text>
        <Button
            onPress={e => alert('Hi')}
            title="Press Me"
            color="#841584"
          />
      </View>
    );
  }
}
