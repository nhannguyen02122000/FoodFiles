import React, { useContext } from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import AuthContext from '../../context/firebaseAuthContext'

import stackNavData from './stackNavData';

const Stack = createStackNavigator();

export default NavigatorView = (props) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) return <AuthScreen />

  return (
    <Stack.Navigator

    >
      {stackNavData.map((item, idx) => (
        <Stack.Screen
          key={`stackItem-${idx}`}
          name={item.name}
          component={item.component}
          options={{ headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  );
}
