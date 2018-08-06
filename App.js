// import config from './app/ReactotronConfig';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './app/store';
import ListView from './app/components/listView';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ListView />
      </Provider>
    );
  }
}
