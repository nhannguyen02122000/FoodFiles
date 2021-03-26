import React, { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import { color } from '../../constants/color'
import { REGISTERSCREEN } from '../../constants/language'
import { Icon, Input, Button } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import * as authAction from '../../store/reducer/userReducer'
import { normalize } from '../../constants/size'
import FloatingLabelInput from '../../components/floatingLabelInput'
import auth from '@react-native-firebase/auth';

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
      const response = await auth()
        .createUserWithEmailAndPassword(user.email, user.password)
      dispatch(authAction.signup({ id: response.user.uid, email: user.email }))
      props.setOpenProfileForm(true)
      props.setLogin(true)
      props.setIsCloseLogin(true)
    }
    catch (er) {
      setMess(er.toString())
      setLoading(false)
    }
  }
  return (
    <ScrollView style={styles.scrollViewStyle}>
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
              size={normalize(36)}
              onPress={() => props.setLogin(true)}
            />
          </View>
        </View>
        {mess !== '' ? <Text style={styles.errMess}>{mess}</Text> : null}
        <View style={styles.bodyForm}>
          <FloatingLabelInput
            labelStyle={styles.labelStyle}
            label={REGISTERSCREEN.EMAIL}
            placeholder={REGISTERSCREEN.EMAIL}
            inputStyle={styles.input}
            inputContainerStyle={styles.containerInput}
            placeholderTextColor={color.WHITE}
            value={user.email}
            onChangeText={value => setUser(user => ({ ...user, email: value }))}
          />
          <FloatingLabelInput
            labelStyle={styles.labelStyle}
            label={REGISTERSCREEN.PASSWORD}
            placeholder={REGISTERSCREEN.PASSWORD}
            inputStyle={styles.input}
            inputContainerStyle={styles.containerInput}
            placeholderTextColor={color.WHITE}
            secureTextEntry={true}
            value={user.password}
            onChangeText={value => setUser(user => ({ ...user, password: value }))}
          />
          <FloatingLabelInput
            labelStyle={styles.labelStyle}
            label={REGISTERSCREEN.CONFIRMPASSWORD}
            placeholder={REGISTERSCREEN.CONFIRMPASSWORD}
            inputStyle={styles.input}
            inputContainerStyle={styles.containerInput}
            placeholderTextColor={color.WHITE}
            secureTextEntry={true}
            value={user.confirmPassword}
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
          containerStyle={{ marginBottom: normalize(10) }}
        />
      </View>
    </ScrollView>
  )
}
export default RegisterForm
const styles = StyleSheet.create({
  scrollViewStyle: {
    marginTop: -normalize(460),
    elevation: 10,
    width: normalize(328),
  },
  registerForm: {
    width: normalize(346),
    // height: normalize(432),
    alignItems: 'center',
    width: normalize(328),
    backgroundColor: color.PRIMARY,
    borderRadius: 8,
  },
  headerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: normalize(10),
    paddingLeft: 0,
    paddingBottom: 0
  },
  headerTitle: {
    color: color.WHITE,
    fontFamily: "OpenSans",
    fontWeight: "bold",
    fontSize: normalize(20),
    paddingLeft: normalize(26),
    marginRight: 'auto'
  },
  smallWhiteLine: {
    width: normalize(5),
    height: normalize(48),
    backgroundColor: color.WHITE,
  },
  bodyForm: {
    padding: normalize(20),
    paddingLeft: normalize(25),
    width: "100%"
  },
  nextBtn: {
    height: normalize(48),
    width: normalize(124),
    borderColor: color.WHITE,
    backgroundColor: color.WHITE,
    //marginTop: -normalize(10),
    //marginBottom: normalize(10),

  },
  nextBtnTitle: {
    color: color.PRIMARY,
    fontWeight: 'bold',
    fontFamily: "Quicksand",
    fontSize: normalize(14),
  },
  input: {
    fontFamily: "Quicksand",
    fontSize: normalize(14),
    color: color.WHITE,
  },
  containerInput: {
    borderColor: color.WHITE,
    marginTop: -normalize(15)
  },
  errMess: {
    color: color.WHITE,
    fontFamily: "Quicksand"
  },
  labelStyle: {
    fontFamily: 'Quicksand',
    fontSize: normalize(12),
    color: color.WHITE
  },
});