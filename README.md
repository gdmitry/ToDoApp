# Forward requests to Reactotron:
adb reverse tcp:9090 tcp:9090

# Open settings on device
adb shell input keyevent 82

# Fix cannot find devices error
chmod 755 android/gradlew