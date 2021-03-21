import React, { useState, useEffect } from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native'

import { color } from '../../constants/color'
import { normalize } from '../../constants/size'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import ProfileForm from './profileForm'

const Auth = () => {

  const [isLogin, setIsLogin] = useState(true)
  const [isCloseLogin, setIsCloseLogin] = useState(false)
  const [openProfileForm, setOpenProfileForm] = useState(false)
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: "center",
      justifyContent: 'flex-start',
      height: "100%",
      width: "100%",
      backgroundColor: color.BACKGROUND
    },
    rectangleBehind: {
      position: 'absolute',
      height: normalize(200),
      width: isLogin ? normalize(305) : normalize(280),
      top: normalize(120),
      backgroundColor: "#fff",
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 4,
        height: 5,
      },
      shadowOpacity: 0.14,
      shadowRadius: 4.65,
      zIndex: 0,
      elevation: 1,
    },
    tinyLogo: {
      width: normalize(64),
      height: normalize(88),
      top: normalize(30)
    },
  });
  return (
    <View style={styles.screen}>
      <Image
        style={styles.tinyLogo}
        source={require('../../../assets/logo/logo.png')}
      />
      <View style={styles.rectangleBehind}></View>
      {!isCloseLogin ? <LoginForm setRegister={setIsLogin} isLogin={isLogin} /> : null}
      {!isLogin ? <RegisterForm setLogin={setIsLogin} setOpenProfileForm={setOpenProfileForm} setIsCloseLogin={setIsCloseLogin} /> : null}
      {openProfileForm ? <ProfileForm /> : null}
    </View>
  )
}
export default Auth
