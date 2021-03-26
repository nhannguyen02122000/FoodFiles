import React, { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { LOGINSCREEN } from '../../constants/language'
import { color } from '../../constants/color'
import { useDispatch } from 'react-redux'
import * as authAction from '../../store/reducer/userReducer'
import FloatingLabelInput from '../../components/floatingLabelInput'
import { normalize } from '../../constants/size'
import auth from '@react-native-firebase/auth'
import { userRef } from '../../store/query'

const LoginForm = (props) => {
  const styles = StyleSheet.create({
    labelStyle: {
      fontFamily: 'Quicksand',
      fontSize: normalize(12),
      color: color.GRAY
    },
    scrollViewStyle: {
      marginTop: normalize(45),
      elevation: 7,
    },
    loginFormContainer: {
      alignItems: 'center',
      width: props.isLogin ? normalize(328) : normalize(305),
      backgroundColor: color.WHITE,
      borderRadius: 8,
      borderColor: color.GRAY,
      borderWidth: 0.4
    },
    headerForm: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: normalize(10),
      paddingLeft: 0,

    },
    headerTitle: {
      color: color.PRIMARY,
      fontFamily: "OpenSans",
      fontWeight: "bold",
      fontSize: normalize(26),
      paddingLeft: normalize(26),
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
      paddingRight: normalize(26),
    },
    smallBlueLine: {
      width: normalize(5),
      height: normalize(48),
      backgroundColor: color.PRIMARY,
    },
    bodyForm: {
      padding: normalize(20),
      paddingLeft: normalize(25),
      width: "100%"
    },
    letsgoBtn: {
      height: normalize(48),
      width: normalize(124),
      borderColor: color.PRIMARY,
      borderWidth: 1,
    },
    letsgoBtnTitle: {
      color: color.PRIMARY,
      fontWeight: 'bold',
      fontFamily: "Quicksand",
      fontSize: normalize(14)
    },
    forgotPass: {
      paddingVertical: normalize(20),
      fontSize: normalize(12),
      fontFamily: "OpenSans",
      color: color.GRAY
    },
    input: {
      fontFamily: "Quicksand",
      fontSize: normalize(14),
      color: color.PRIMARY
    },
    errMess: {
      color: color.WARNING,
      fontFamily: "Quicksand"
    },
    inputContainerStyle: {
      borderColor: color.PRIMARY
    },
    containerStyle: {
      //marginTop: -normalize(20)
    }
  });
  const [user, setUser] = useState({ email: '', password: '' })
  const [mess, setMess] = useState('')
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const loginHanlder = () => {
    setIsLoading(true)

    auth().signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // Signed in
        dispatch(authAction.login({ id: userCredential.user.uid, email: user.email }))
        userRef.doc(userCredential.user.uid).get().then(res => {
          dispatch(authAction.setUser(res.data()))
        })
      })
      .catch((error) => {
        console.log(error)
        setMess(LOGINSCREEN.ERRORMESS)
        setIsLoading(false)
      });

  }
  return (
    <ScrollView style={styles.scrollViewStyle}>
      <View style={{ ...styles.loginFormContainer }}>
        <View style={styles.headerForm}>
          <View style={styles.smallBlueLine}></View>
          <Text style={styles.headerTitle}>{LOGINSCREEN.LOGIN}</Text>
          <View>
            <Icon
              reverse
              name='create'
              type='material'
              color={color.PRIMARY}
              size={36}
              containerStyle={styles.closeBtn}
              onPress={() => props.setRegister(false)}
            />
          </View>
        </View>
        <Text style={styles.errMess}>{mess}</Text>
        <View style={styles.bodyForm}>
          <FloatingLabelInput
            labelStyle={styles.labelStyle}
            label={LOGINSCREEN.EMAIL}
            placeholder={LOGINSCREEN.EMAIL}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            value={user.email}
            onChangeText={value => setUser(user => ({ ...user, email: value }))}
          />
          <FloatingLabelInput
            labelStyle={styles.labelStyle}
            label={LOGINSCREEN.PASSWORD}
            placeholder={LOGINSCREEN.PASSWORD}
            inputStyle={styles.input}
            secureTextEntry={true}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            value={user.password}
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
          loading={isLoading}
          disabled={isLoading}
        />
        <TouchableOpacity onPress={() => props.setIsForgot(true)}>
          <Text style={styles.forgotPass}>
            {LOGINSCREEN.FORGOTPASSWORD}
          </Text>
        </TouchableOpacity>
      </View >
    </ScrollView>
  )
}
export default LoginForm
