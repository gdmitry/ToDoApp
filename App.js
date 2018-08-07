import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Routes from './app/Routes';
import './app/ReactotronConfig';
import store from './app/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
