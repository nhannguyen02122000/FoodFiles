import React from 'react';
import { useSelector } from 'react-redux'
import { createStackNavigator, Header } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import AuthScreen from '../auth/index'
import stackNavData from './stackNavData';
import { normalize } from '../../constants/size'

const Stack = createStackNavigator();
const styles = StyleSheet.create({
  headerTitleStyle: {
    //paddingLeft: 50,
    //flex: 1,
    //alignItems: 'center',
    //  justifyContent: 'center',
    backgroundColor: 'red',
    margin: 0,
    padding: 0
  }
})

const headerLeftComponentMenu = () => {
  return (
    <TouchableOpacity
      //onPress={() => props.navigation.toggleDrawer()}
      style={{
        //paddingHorizontal: 16,
        // paddingVertical: 12,
        backgroundColor: 'green',
        margin: 0,
        padding: 0
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
          //marginLeft: -50,
          backgroundColor: 'yellow'
        }}
      />
    </TouchableOpacity>
  )
}

export default NavigatorView = (props) => {
  const { user } = useSelector(state => state.user)
  // if (!user.isAuthenticated) return <AuthScreen />

  return (
    <Stack.Navigator>
      {stackNavData.map((item, idx) => (
        <Stack.Screen
          key={`stackItem-${idx}`}
          name={item.name}
          component={item.component}
          // options={{ headerShown: false }}
          options={{
            headerLeft: item.headerLeft || headerLeftComponentMenu,
            headerTitleStyle: item.headerTitleStyle || styles.headerTitleStyle,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
