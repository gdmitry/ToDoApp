import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

class Auth extends Component {
  state = {
    isSigninInProgress: false
  }

  componentDidMount() {
    GoogleSignin.configure();
  }

  signIn = async () => {
    this.setState({ isSigninInProgress: true })

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  render() {

    return <GoogleSigninButton
      style={{width: 48, height: 48}}
      // size={GoogleSigninButton.Size.Icon}
      // color={GoogleSigninButton.Color.Dark}
      onPress={this.signIn}
      disabled={this.state.isSigninInProgress}/>

  }
}

Auth.propTypes = {
  // navigateToPage: PropTypes.func.isRequired,
  // fetchUsers: PropTypes.func.isRequired,
  // loading: PropTypes.bool.isRequired,
  // users: PropTypes.array.isRequired,
  // error: PropTypes.object
};

export default Auth;
