import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Block, GalioProvider } from 'galio-framework';
import { Provider } from 'react-redux';
import { store } from "./src/store/store"

export default App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GalioProvider>
          <Block flex>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <View style={styles.container}>
              <Text>Open up App.js to start working on your app!</Text>
            </View>
          </Block>
        </GalioProvider>
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
  },
});
