import React, { useState } from 'react'
import { FORGOT } from '../../constants/language'
import { size } from '../../constants/size'
import { color } from '../../constants/color'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert
} from 'react-native'
import {
  Button
} from 'react-native-elements'
import FloatingLabelInput from '../../components/floatingLabelInput'
import { normalize } from '../../constants/size'
import auth from '@react-native-firebase/auth'

const { width, height } = Dimensions.get('screen')
const ForgotForm = (props) => {
  const [email, setEmail] = useState('')
  return (
    <View style={styles.screen}>
      <Image
        style={styles.tinyLogo}
        source={require('../../../assets/logo/logo.png')}
      />
      <View style={styles.form}>
        <Text style={styles.title}>{FORGOT.TITLE}</Text>
        <Text style={styles.content}>{FORGOT.CONTENT}</Text>
        <FloatingLabelInput
          labelStyle={styles.labelStyle}
          label={FORGOT.EMAIL}
          placeholder={FORGOT.EMAIL}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <Button
          buttonStyle={styles.btn}
          title={FORGOT.SEND}
          labelStyle={{ fontFamily: "Quicksand", fontSize: 14 }}
          onPress={() => auth().sendPasswordResetEmail(email || ' ').then(() => {
            Alert.alert('Please check your mailbox')
            props.setIsForgot(false)
          }).catch(er => Alert.alert('Some error happens, please try again'))
          }
        />
      </View>
      <Button
        title={FORGOT.BACK}
        type="clear"
        titleStyle={styles.backBtn}
        onPress={() => props.setIsForgot(false)}
      />
    </View>
  )
}
export default ForgotForm
const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: color.BACKGROUND,
    flexDirection: 'column',
    alignItems: 'center'
  },
  tinyLogo: {
    width: normalize(64),
    height: normalize(88),
    marginTop: normalize(50),
    marginBottom: normalize(20)
  },
  form: {
    backgroundColor: color.WHITE,
    margin: normalize(20),
    padding: normalize(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    color: color.PRIMARY,
    fontFamily: "OpenSans",
    fontSize: normalize(24),
    fontWeight: '400'
  },
  content: {
    textAlign: 'center',
    fontFamily: 'Quicksand',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: normalize(14),
    marginVertical: normalize(10)
  },
  inputContainerStyle: {
    width: "100%"
  },
  labelStyle: {
    color: color.PRIMARY,
    fontFamily: 'OpenSans'
  },
  btn: {
    paddingVertical: normalize(10),
    backgroundColor: color.PRIMARY
  },
  backBtn: {
    color: color.PRIMARY,
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: 'bold'
  }
})