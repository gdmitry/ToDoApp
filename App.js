import React from 'react';
import { Provider } from 'react-redux';
import Routes from './app/Routes';
import './app/ReactotronConfig';
import store from './app/store';

export default () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);
