import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import ListView from './listView';
import GridView from './gridView';

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "listView" component = {ListView} title = "List" initial = {true} />
         <Scene key = "gridView" component = {GridView} title = "Grid" />
      </Scene>
   </Router>
)
export default Routes;