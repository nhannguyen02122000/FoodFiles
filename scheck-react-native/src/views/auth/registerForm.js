import React, { useState } from 'react'
import { Text, View, StyleSheet, PixelRatio } from 'react-native'
import { color } from '../../constants/color'
import { REGISTERSCREEN } from '../../constants/language'
import { Icon, Input, Button } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import * as authAction from '../../store/reducer/userReducer'

const RegisterForm = (props) => {
  const [mess, setMess] = useState('')
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const registerHandler = async () => {
    if (user.email === '' || user.password === '') {
      setMess(REGISTERSCREEN.EMPTY)
      return
    }
    if (user.password !== user.confirmPassword) {
      setMess(REGISTERSCREEN.PASSMISMATCH)
      return
    }
    try {
      setLoading(true)
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAr-s6K-0G3do1xDqB0xhiCFghMC2xMsho', {
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
      const resData = await response.json()
      if (!response.ok) {
        console.log(resData.error.message)
        throw new Error(resData.error.message)
      }
      dispatch(authAction.signup({ ...resData, email: user.email }))
    }
    catch (er) {
      setMess(er.toString())
    }
  }
  return (
    <View style={styles.registerForm}>
      <View style={styles.headerForm}>
        <View style={styles.smallWhiteLine}></View>
        <Text style={styles.headerTitle}>{REGISTERSCREEN.REGISTER}</Text>
        <View>
          <Icon
            reverse
            name='clear'
            type='material'
            color={color.PRIMARY}
            size={PixelRatio.getPixelSizeForLayoutSize(36)}
            onPress={() => props.setLogin(true)}
          />
        </View>
      </View>
      <Text style={styles.errMess}>{mess}</Text>
      <View style={styles.bodyForm}>
        <Input
          placeholder={REGISTERSCREEN.EMAIL}
          inputStyle={styles.input}
          inputContainerStyle={styles.containerInput}
          placeholderTextColor={color.WHITE}
          onChangeText={value => setUser(user => ({ ...user, email: value }))}
        />
        <Input
          placeholder={REGISTERSCREEN.PASSWORD}
          inputStyle={styles.input}
          inputContainerStyle={styles.containerInput}
          placeholderTextColor={color.WHITE}
          secureTextEntry={true}
          onChangeText={value => setUser(user => ({ ...user, password: value }))}
        />
        <Input
          placeholder={REGISTERSCREEN.CONFIRMPASSWORD}
          inputStyle={styles.input}
          inputContainerStyle={styles.containerInput}
          placeholderTextColor={color.WHITE}
          secureTextEntry={true}
          onChangeText={value => setUser(user => ({ ...user, confirmPassword: value }))}
        />
      </View>
      <Button
        title={REGISTERSCREEN.NEXT}
        type="solid"
        buttonStyle={styles.nextBtn}
        titleStyle={styles.nextBtnTitle}
        onPress={registerHandler}
        loading={loading}
        loadingProps={{ color: color.PRIMARY }}
        disabled={loading}
      />
    </View>
  )
}
export default RegisterForm
const styles = StyleSheet.create({
  registerForm: {
    position: 'absolute',
    width: PixelRatio.getPixelSizeForLayoutSize(346),
    height: PixelRatio.getPixelSizeForLayoutSize(432),
    top: PixelRatio.getPixelSizeForLayoutSize(193),
    backgroundColor: color.PRIMARY,
    zIndex: 6,
    elevation: 6,
    borderRadius: 8,
    alignItems: "center"
  },
  headerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: PixelRatio.getPixelSizeForLayoutSize(20),
    paddingLeft: 0,
    paddingBottom: 0
  },
  headerTitle: {
    color: color.WHITE,
    fontFamily: "OpenSans",
    fontWeight: "bold",
    fontSize: PixelRatio.getPixelSizeForLayoutSize(26),
    paddingLeft: PixelRatio.getPixelSizeForLayoutSize(26),
    marginRight: 'auto'
  },
  smallWhiteLine: {
    width: PixelRatio.getPixelSizeForLayoutSize(5),
    height: PixelRatio.getPixelSizeForLayoutSize(48),
    backgroundColor: color.WHITE,
  },
  bodyForm: {
    padding: PixelRatio.getPixelSizeForLayoutSize(20),
    paddingLeft: PixelRatio.getPixelSizeForLayoutSize(25),
    width: "100%"
  },
  nextBtn: {
    height: PixelRatio.getPixelSizeForLayoutSize(48),
    width: PixelRatio.getPixelSizeForLayoutSize(124),
    borderColor: color.WHITE,
    backgroundColor: color.WHITE
  },
  nextBtnTitle: {
    color: color.PRIMARY,
    fontWeight: 'bold',
    fontFamily: "Quicksand",
    fontSize: PixelRatio.getPixelSizeForLayoutSize(14)
  },
  input: {
    fontFamily: "Quicksand",
    fontSize: PixelRatio.getPixelSizeForLayoutSize(20),
    color: color.WHITE,
  },
  containerInput: {
    borderColor: color.WHITE
  },
  errMess: {
    color: color.WARNING,
    fontFamily: "Quicksand"
  }
});