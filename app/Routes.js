import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import ListView from './components/listView'
import GridView from './components/listView'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "listView" component = {ListView} title = "Home" initial = {true} />
         <Scene key = "gridView" component = {GridView} title = "About" />
      </Scene>
   </Router>
)
export default Routes;