import * as React from 'react';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import RootNavigation from './rootNavigation';
import * as theme from "../../constants/color"


const Drawer = createDrawerNavigator();

export default App = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: theme.BACKGROUND_COLOR,
      }}
    >
      <Drawer.Screen name="Homes" component={RootNavigation} />
    </Drawer.Navigator>
  );
}
