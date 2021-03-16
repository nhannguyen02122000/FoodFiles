import React from 'react';
import { useSelector } from 'react-redux'
import { createStackNavigator, Header } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import AuthScreen from '../auth/index'
import stackNavData from './stackNavData';

const Stack = createStackNavigator();
const headerLeftComponentMenu = () => {
  return (
    <TouchableOpacity
      //onPress={() => props.navigation.toggleDrawer()}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Image
        source={require('../../../assets/menu.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>
  )
}

export default NavigatorView = (props) => {
  const { user } = useSelector(state => state.user)
  if (!user.isAuthenticated) return <AuthScreen />

  return (
    <Stack.Navigator>
      {stackNavData.map((item, idx) => (
        <Stack.Screen
          key={`stackItem-${idx}`}
          name={item.name}
          component={item.component}
          //options={{ headerShown: false }}
          options={{
            headerLeft: item.headerLeft || headerLeftComponentMenu,
            headerTitleStyle: item.headerTitleStyle,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
