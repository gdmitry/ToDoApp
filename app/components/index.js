import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import ListView from './listView';
import GridView from './gridView';
import Auth from './Auth';
import withLoader from './loader';
import * as Actions from '../actions';

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene key="auth" component={Auth} title="Auth" initial />
      <Scene key="listView" component={withLoader(ListView, Actions.fetchUsers(1, 20))} title="List" />
      <Scene key="gridView" component={withLoader(GridView, Actions.fetchUsers(1, 20))} title="Grid" />
    </Scene>
  </Router>
);

export default Routes;
