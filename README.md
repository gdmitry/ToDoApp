# Forward requests to Reactotron:
adb reverse tcp:9090 tcp:9090

# Open settings on device
adb shell input keyevent 82

# Install CLI to run project
npm install -g react-native-cli
