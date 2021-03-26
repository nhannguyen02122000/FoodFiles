import React from 'react';
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import AuthScreen from '../auth/index'
import stackNavData from './stackNavData';
import { color } from '../../constants/color'

const Stack = createStackNavigator();
const styles = StyleSheet.create({
  headerTitleStyle: {
    margin: 0,
    padding: 0
  }
})


export default NavigatorView = (props) => {
  const { user } = useSelector(state => state.user)
  if (!user.isAuthenticated) return <AuthScreen />

  const headerLeftComponentMenu = () => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.toggleDrawer()}
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <Image
          source={require('../../../assets/menu.png')}
          resizeMode="contain"
          style={{
            height: 30,
            width: 30,
            paddingLeft: 0,
            marginLeft: 20,
            tintColor: color.PRIMARY,
          }}
        />
      </TouchableOpacity>
    )
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTransparent: true
      }}
    >
      {stackNavData.map((item, idx) => (
        <Stack.Screen
          key={`stackItem-${idx}`}
          name={item.name}
          component={item.component}
          headerTransparent
          options={{
            headerLeft: item.headerLeft || headerLeftComponentMenu,
            headerTitleStyle: item.headerTitleStyle || styles.headerTitleStyle,
            headerTitle: '',
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
