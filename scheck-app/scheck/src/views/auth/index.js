import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
} from 'react-native'

import { color } from '../../constants/color'
import { normalize } from '../../constants/size'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import ProfileForm from './profileForm'
import ForgotForm from './forgotForm'

const Auth = () => {
  const [isForgot, setIsForgot] = useState(false)
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
      borderColor: 'black',
      borderWidth: 0.15,
      top: normalize(120,),
      backgroundColor: "#fff",
      borderRadius: 6,

      zIndex: 0,
    },
    tinyLogo: {
      width: normalize(64),
      height: normalize(88),
      top: normalize(30)
    },
  });
  if (isForgot) return <ForgotForm setIsForgot={setIsForgot} />
  return (
    <View style={styles.screen}>
      <Image
        style={styles.tinyLogo}
        source={require('../../../assets/logo/logo.png')}
      />
      <View style={styles.rectangleBehind}></View>
      {!isCloseLogin ? <LoginForm setRegister={setIsLogin} isLogin={isLogin} setIsForgot={setIsForgot} /> : null}
      {!isLogin ? <RegisterForm setLogin={setIsLogin} setOpenProfileForm={setOpenProfileForm} setIsCloseLogin={setIsCloseLogin} /> : null}
      {openProfileForm ? <ProfileForm /> : null}
    </View>
  )
}
export default Auth
