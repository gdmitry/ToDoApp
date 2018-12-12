import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleSignin } from 'react-native-google-signin';
import settings from '../settings.json';

import {
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class Auth extends Component {
  componentDidMount() {
    this.setupGoogleSignin();
  }

  googleAuth() {
    GoogleSignin.signIn()
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
  }

  async setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: settings.iOSClientId,
        webClientId: settings.webClientId,
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
    }
    catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  render() {
    return <TouchableOpacity onPress={this.googleAuth.bind(this)}>
      <Text>Login with Google</Text>
    </TouchableOpacity>
  }
}

function mapStateToProps(state) {
  return {
    loading: state.dataReducer.loading,
    followers: state.dataReducer.followers,
    error: state.dataReducer.error
  };
}

Auth.propTypes = {
  navigateToPage: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  error: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
