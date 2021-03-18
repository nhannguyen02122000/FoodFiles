import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Block, GalioProvider } from 'galio-framework';
import { Provider } from 'react-redux';
import { store, useSelector } from "./src/store/store"
import AppView from "./src/views/navigation/index"
import { useFonts } from 'expo-font'
import WelcomeScreen from './src/views/welcomeSeries/welcome'

export default App = () => {
  const [loaded] = useFonts({
    OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
    Quicksand: require('./assets/fonts/Quicksand-Regular.ttf'),
  })
  const [walkthroughScreen, setWalkthroughScreen] = useState(true)
  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <GalioProvider> */}
        {/* <Block flex>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />} */}
        {walkthroughScreen ?
          <WelcomeScreen setWalkthroughScreen={setWalkthroughScreen} /> :
          <AppView />
        }
        {/* </Block> */}
        {/* </GalioProvider> */}
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
