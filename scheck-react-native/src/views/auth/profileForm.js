import React, { useState } from 'react'
import { Text, View, StyleSheet, PixelRatio } from 'react-native'
import { Icon, Input, Button } from 'react-native-elements'
import { USERDETAILAUTHSCREEN } from '../../constants/language'
import { color } from '../../constants/color'
import { useDispatch } from 'react-redux'
import * as authAction from '../../store/reducer/userReducer'
import FloatingLabelInput from '../../components/floatingLabelInput'

const ProfileForm = (props) => {
  const [profile, setProfile] = useState({
    name: '',
    gender: '',
    age: 0,
    height: 0,
    weight: 0
  })
  const [mess, setMess] = useState('')
  const dispatch = useDispatch()
  const skipHandler = () => {
    dispatch(authAction.authenticated())
  }
  return (
    <View style={styles.profileForm}>
      <View style={styles.headerForm}>
        <Text style={styles.headerTitle}>{USERDETAILAUTHSCREEN.PROFILE}</Text>
      </View>
      <Text style={styles.errMess}>{mess}</Text>
      <View style={styles.bodyForm}>
        <FloatingLabelInput
          labelStyle={styles.labelStyle}
          label={USERDETAILAUTHSCREEN.NAME}
          placeholder={USERDETAILAUTHSCREEN.NAME}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainerStyle}
          onChangeText={value => setProfile(profile => ({ ...profile, name: value }))}
        />
        <FloatingLabelInput
          containerStyle={styles.containerStyle}
          labelStyle={styles.labelStyle}
          label={USERDETAILAUTHSCREEN.GENDERLABEL}
          placeholder={USERDETAILAUTHSCREEN.GENDER}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainerStyle}
          onChangeText={value => setProfile(profile => ({ ...profile, gender: value }))}
        />
        <FloatingLabelInput
          containerStyle={styles.containerStyle}
          labelStyle={styles.labelStyle}
          label={USERDETAILAUTHSCREEN.AGE}
          placeholder={USERDETAILAUTHSCREEN.AGE}
          inputStyle={styles.input}
          keyboardType="numeric"
          inputContainerStyle={styles.inputContainerStyle}
          onChangeText={value => setProfile(profile => ({ ...profile, age: parseFloat(value) }))}
        />
        <FloatingLabelInput
          containerStyle={styles.containerStyle}
          labelStyle={styles.labelStyle}
          label={USERDETAILAUTHSCREEN.HEIGHTLABEL}
          placeholder={USERDETAILAUTHSCREEN.HEIGHT}
          inputStyle={styles.input}
          keyboardType="numeric"
          inputContainerStyle={styles.inputContainerStyle}
          onChangeText={value => setProfile(profile => ({ ...profile, height: parseFloat(value) }))}
        />
        <FloatingLabelInput
          containerStyle={styles.containerStyle}
          labelStyle={styles.labelStyle}
          label={USERDETAILAUTHSCREEN.WEIGHTLABEL}
          placeholder={USERDETAILAUTHSCREEN.WEIGHT}
          inputStyle={styles.input}
          keyboardType="numeric"
          inputContainerStyle={styles.inputContainerStyle}
          onChangeText={value => setProfile(profile => ({ ...profile, weight: parseFloat(value) }))}
        />

      </View>
      <View style={styles.btnContainer}>
        <Button
          title={USERDETAILAUTHSCREEN.CREATE}
          type="solid"
          buttonStyle={styles.letsgoBtn}
        />
        <Button
          title={USERDETAILAUTHSCREEN.SKIP}
          type="outline"
          buttonStyle={styles.letsgoBtn}
          onPress={skipHandler}
        />
      </View>
    </View>
  )
}
export default ProfileForm
const styles = StyleSheet.create({
  profileForm: {
    position: 'absolute',
    width: PixelRatio.getPixelSizeForLayoutSize(360),
    height: PixelRatio.getPixelSizeForLayoutSize(500),
    top: PixelRatio.getPixelSizeForLayoutSize(201),
    backgroundColor: "#fff",
    zIndex: 5,
    elevation: 6,
    borderRadius: 8,
    alignItems: "center"
  },
  headerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerTitle: {
    color: color.PRIMARY,
    fontFamily: "OpenSans",
    fontWeight: "bold",
    fontSize: PixelRatio.getPixelSizeForLayoutSize(34),
  },
  bodyForm: {
    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(25),
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
    fontSize: PixelRatio.getPixelSizeForLayoutSize(14),
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
    borderColor: color.PRIMARY,
    padding: 0,
    margin: 0
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(30)
  },
  labelStyle: {
    fontFamily: 'Quicksand'
  },
  containerStyle: {
    marginTop: -PixelRatio.getPixelSizeForLayoutSize(20),
  }
});