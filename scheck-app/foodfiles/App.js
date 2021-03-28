import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store, useSelector } from "./src/store/store"
import AppView from "./src/views/navigation/index"
import WelcomeScreen from './src/views/welcomeSeries/welcome'

export default App = () => {
  const [walkthroughScreen, setWalkthroughScreen] = useState(true)
  return (
    <Provider store={store}>
      <NavigationContainer>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {walkthroughScreen ?
          <WelcomeScreen setWalkthroughScreen={setWalkthroughScreen} /> :
          <AppView />
        }
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
});
