import React, { useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Image, Platform, PixelRatio } from 'react-native'
import { useFonts } from 'expo-font'
import { color } from '../../constants/color'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import ProfileForm from './profileForm'

const Auth = () => {
  const [loaded] = useFonts({
    OpenSans: require('../../../assets/fonts/OpenSans-Regular.ttf'),
    Quicksand: require('../../../assets/fonts/Quicksand-Regular.ttf'),
  })
  const [isLogin, setIsLogin] = useState(false)
  const [openProfileForm, setOpenProfileForm] = useState(true)
  if (!loaded) {
    return null;
  }
  console.log(isLogin)
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
    >
      <View style={styles.backgroundTop}>
        <Image
          style={styles.tinyLogo}
          source={require('../../../assets/logo/logo.png')}
        />
      </View>
      <View style={styles.rectangleBehind}></View>
      <LoginForm setRegister={setIsLogin} />
      {!isLogin ? <RegisterForm setLogin={setIsLogin} /> : null}
      {openProfileForm ? <ProfileForm /> : null}
    </KeyboardAvoidingView >
  )
}
export default Auth
const styles = StyleSheet.create({
  screen: {
    flex: -1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
  backgroundTop: {
    //backgroundColor: color.PRIMARY,
    width: "100%",
    height: PixelRatio.getPixelSizeForLayoutSize(296),
    alignItems: "center"
  },
  rectangleBehind: {
    position: 'absolute',
    height: PixelRatio.getPixelSizeForLayoutSize(370),
    width: PixelRatio.getPixelSizeForLayoutSize(312),
    top: PixelRatio.getPixelSizeForLayoutSize(177),
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 0.14,
    shadowRadius: 4.65,
    elevation: 5,
    zIndex: 0
  },
  tinyLogo: {
    width: PixelRatio.getPixelSizeForLayoutSize(64),
    height: PixelRatio.getPixelSizeForLayoutSize(88),
    top: PixelRatio.getPixelSizeForLayoutSize(88)
  },
  scrollview: {
    width: "100%",
    height: "100%"
  }
});