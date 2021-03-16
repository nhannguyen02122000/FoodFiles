import React, { useState } from 'react'
import { Text, View, StyleSheet, PixelRatio } from 'react-native'
import { Icon, Input, Button } from 'react-native-elements'
import { LOGINSCREEN } from '../../constants/language'
import { color } from '../../constants/color'
import { useDispatch } from 'react-redux'
import * as authAction from '../../store/reducer/userReducer'

const LoginForm = (props) => {
  const [user, setUser] = useState({ email: '', password: '' })
  const [mess, setMess] = useState('')
  const dispatch = useDispatch()
  const loginHanlder = async () => {
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAr-s6K-0G3do1xDqB0xhiCFghMC2xMsho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          returnSecureToken: true
        })
      })
      if (!response.ok) {
        throw new Error("Something went wrong! Please try again")
      }
      const resData = await response.json()
      dispatch(authAction.login({ ...resData, email: user.email }))
    }
    catch (er) {
      setMess(LOGINSCREEN.ERRORMESS)
    }
  }
  return (
    <View style={styles.loginForm}>
      <View style={styles.headerForm}>
        <View style={styles.smallBlueLine}></View>
        <Text style={styles.headerTitle}>{LOGINSCREEN.LOGIN}</Text>
        <View>
          <Icon
            reverse
            name='create'
            type='material'
            color={color.PRIMARY}
            size={PixelRatio.getPixelSizeForLayoutSize(36)}
            containerStyle={styles.closeBtn}
            onPress={() => props.setRegister(false)}
          />
        </View>
      </View>
      <Text style={styles.errMess}>{mess}</Text>
      <View style={styles.bodyForm}>
        <Input
          placeholder={LOGINSCREEN.EMAIL}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainerStyle}
          onChangeText={value => setUser(user => ({ ...user, email: value }))}
        />
        <Input
          placeholder={LOGINSCREEN.PASSWORD}
          inputStyle={styles.input}
          secureTextEntry={true}
          inputContainerStyle={styles.inputContainerStyle}
          onChangeText={value => setUser(user => ({ ...user, password: value }))}
        />
      </View>
      <Button
        title={LOGINSCREEN.LETSGO}
        type="outline"
        buttonStyle={styles.letsgoBtn}
        titleStyle={styles.letsgoBtnTitle}
        disabled={user.email === '' || user.password === ''}
        onPress={loginHanlder}
      />
      <Text style={styles.forgotPass}>
        {LOGINSCREEN.FORGOTPASSWORD}
      </Text>
    </View>
  )
}
export default LoginForm
const styles = StyleSheet.create({
  loginForm: {
    position: 'absolute',
    width: PixelRatio.getPixelSizeForLayoutSize(328),
    height: PixelRatio.getPixelSizeForLayoutSize(406),
    top: PixelRatio.getPixelSizeForLayoutSize(185),
    backgroundColor: "#fff",
    zIndex: 5,
    elevation: 6,
    borderRadius: 8,
    alignItems: "center"
  },
  headerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: PixelRatio.getPixelSizeForLayoutSize(20),
    paddingLeft: 0
  },
  headerTitle: {
    color: color.PRIMARY,
    fontFamily: "OpenSans",
    fontWeight: "bold",
    fontSize: PixelRatio.getPixelSizeForLayoutSize(26),
    paddingLeft: PixelRatio.getPixelSizeForLayoutSize(26),
    marginRight: 'auto'
  },
  closeBtn: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    paddingRight: PixelRatio.getPixelSizeForLayoutSize(26),
  },
  smallBlueLine: {
    width: PixelRatio.getPixelSizeForLayoutSize(5),
    height: PixelRatio.getPixelSizeForLayoutSize(48),
    backgroundColor: color.PRIMARY,
  },
  bodyForm: {
    padding: PixelRatio.getPixelSizeForLayoutSize(20),
    paddingLeft: PixelRatio.getPixelSizeForLayoutSize(25),
    width: "100%"
  },
  letsgoBtn: {
    height: PixelRatio.getPixelSizeForLayoutSize(48),
    width: PixelRatio.getPixelSizeForLayoutSize(124),
    borderColor: color.PRIMARY,
  },
  letsgoBtnTitle: {
    color: color.PRIMARY,
    fontWeight: 'bold',
    fontFamily: "Quicksand",
    fontSize: PixelRatio.getPixelSizeForLayoutSize(14)
  },
  forgotPass: {
    paddingTop: PixelRatio.getPixelSizeForLayoutSize(30),
    fontSize: PixelRatio.getPixelSizeForLayoutSize(14),
    fontFamily: "OpenSans",
    color: color.GRAY
  },
  input: {
    fontFamily: "Quicksand",
    fontSize: PixelRatio.getPixelSizeForLayoutSize(20),
    color: color.PRIMARY
  },
  errMess: {
    color: color.WARNING,
    fontFamily: "Quicksand"
  },
  inputContainerStyle: {
    borderColor: color.PRIMARY
  }
});