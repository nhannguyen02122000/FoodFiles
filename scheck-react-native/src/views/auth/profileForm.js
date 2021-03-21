import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import { Icon, Input, Button } from 'react-native-elements'
import { USERDETAILAUTHSCREEN } from '../../constants/language'
import { color } from '../../constants/color'
import { useDispatch } from 'react-redux'
import * as authAction from '../../store/reducer/userReducer'
import FloatingLabelInput from '../../components/floatingLabelInput'
import { userRef } from '../../store/query'
import { normalize } from '../../constants/size'
import { Picker } from '@react-native-picker/picker'

const ProfileForm = (props) => {
  const [profile, setProfile] = useState({
    fullfullname: '',
    gender: USERDETAILAUTHSCREEN.OTHER,
    age: '',
    height: '',
    weight: '',
    goal: USERDETAILAUTHSCREEN.MAINTAINWEIGHT
  })
  const [mess, setMess] = useState('')
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const skipHandler = () => {
    dispatch(authAction.authenticated())
    userRef.doc(user.id).set({ ...profile, id: user.id, email: user.email, role: "User" }).then()
  }
  const createHandler = () => {
    if (profile.fullname === '') {
      setMess(USERDETAILAUTHSCREEN.NAMENOTNULL)
      return
    }
    if (profile.gender === '') {
      setMess(USERDETAILAUTHSCREEN.GENDERNOTNULL)
      return
    }
    if (profile.age === 0) {
      setMess(USERDETAILAUTHSCREEN.AGEWRONG)
      return
    }
    if (profile.weight === 0) {
      setMess(USERDETAILAUTHSCREEN.WEIGHTWRONG)
      return
    }
    if (profile.height === 0) {
      setMess(USERDETAILAUTHSCREEN.HEIGHTWRONG)
      return
    }
    setMess('')
    console.log(user)
    userRef.doc(user.id).set({ ...profile, id: user.id, email: user.email, role: "User" }).then()
    dispatch(authAction.setUser(({ ...profile, isAuthenticated: true })))
  }
  return (
    <View style={{ height: "80%" }}>
      <ScrollView style={styles.scrollViewStyle}>
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
              value={profile.fullname}
              onChangeText={value => setProfile(profile => ({ ...profile, fullname: value }))}
            />
            <View style={{ marginBottom: normalize(10), marginTop: -20 }}>
              <Text
                style={{ ...styles.labelStyle, paddingLeft: normalize(12), fontWeight: "bold" }}
              >
                {USERDETAILAUTHSCREEN.GENDER}
              </Text>
              <Picker
                style={{ marginLeft: normalize(9), color: color.BLACK }}
                selectedValue={profile.gender}
                onValueChange={(itemValue, itemIndex) =>
                  setProfile(profile => ({ ...profile, gender: itemValue }))
                }
              >
                <Picker.Item label={USERDETAILAUTHSCREEN.MALE} value={USERDETAILAUTHSCREEN.MALE} />
                <Picker.Item label={USERDETAILAUTHSCREEN.FEMALE} value={USERDETAILAUTHSCREEN.FEMALE} />
                <Picker.Item label={USERDETAILAUTHSCREEN.OTHER} value={USERDETAILAUTHSCREEN.OTHER} />
              </Picker>
            </View>
            <FloatingLabelInput
              keyboardType={'numeric'}
              containerStyle={styles.containerStyle}
              labelStyle={styles.labelStyle}
              label={USERDETAILAUTHSCREEN.AGE}
              placeholder={USERDETAILAUTHSCREEN.AGE}
              inputStyle={styles.input}
              keyboardType="numeric"
              inputContainerStyle={styles.inputContainerStyle}
              value={profile.age}
              onChangeText={value => setProfile(profile => ({ ...profile, age: value }))}
            />
            <FloatingLabelInput
              keyboardType={'numeric'}
              containerStyle={styles.containerStyle}
              labelStyle={styles.labelStyle}
              label={USERDETAILAUTHSCREEN.HEIGHTLABEL}
              placeholder={USERDETAILAUTHSCREEN.HEIGHT}
              inputStyle={styles.input}
              keyboardType="numeric"
              inputContainerStyle={styles.inputContainerStyle}
              value={profile.height.toString()}
              onChangeText={value => setProfile(profile => ({ ...profile, height: value }))}
            />
            <FloatingLabelInput
              keyboardType={'numeric'}
              containerStyle={styles.containerStyle}
              labelStyle={styles.labelStyle}
              label={USERDETAILAUTHSCREEN.WEIGHTLABEL}
              placeholder={USERDETAILAUTHSCREEN.WEIGHT}
              inputStyle={styles.input}
              keyboardType="numeric"
              inputContainerStyle={styles.inputContainerStyle}
              value={profile.weight.toString()}
              onChangeText={value => setProfile(profile => ({ ...profile, weight: value }))}
            />
            <View style={{ marginBottom: normalize(10), marginTop: -20 }}>
              <Text
                style={{ ...styles.labelStyle, paddingLeft: normalize(12), fontWeight: "bold" }}
              >
                {USERDETAILAUTHSCREEN.GOAL}
              </Text>
              <Picker
                style={{ marginLeft: normalize(9), color: color.BLACK }}
                selectedValue={profile.goal}
                onValueChange={(itemValue, itemIndex) =>
                  setProfile(profile => ({ ...profile, goal: itemValue }))
                }
              >
                <Picker.Item label={USERDETAILAUTHSCREEN.GAINWEIGHT} value={USERDETAILAUTHSCREEN.GAINWEIGHT} />
                <Picker.Item label={USERDETAILAUTHSCREEN.LOSEWEIGHT} value={USERDETAILAUTHSCREEN.LOSEWEIGHT} />
                <Picker.Item label={USERDETAILAUTHSCREEN.MAINTAINWEIGHT} value={USERDETAILAUTHSCREEN.MAINTAINWEIGHT} />
              </Picker>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Button
              title={USERDETAILAUTHSCREEN.CREATE}
              type="solid"
              buttonStyle={styles.createBtn}
              titleStyle={{ ...styles.skipTitleBtn, color: color.WHITE }}
              onPress={createHandler}
            />
            <Button
              title={USERDETAILAUTHSCREEN.SKIP}
              type="clear"
              buttonStyle={styles.skipBtn}
              titleStyle={styles.skipTitleBtn}
              onPress={skipHandler}
            />
          </View>
        </View>
      </ScrollView >
    </View>
  )
}
export default ProfileForm
const styles = StyleSheet.create({
  scrollViewStyle: {
    marginTop: -normalize(70),
    elevation: 15,
  },
  profileForm: {
    alignItems: 'center',
    width: normalize(328),

    backgroundColor: color.WHITE,
    borderRadius: 8,
    borderColor: color.GRAY,
    borderWidth: 0.4,
  },
  headerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: normalize(25),
    marginTop: normalize(25)
  },
  headerTitle: {
    color: color.PRIMARY,
    fontFamily: "OpenSans",
    fontWeight: "bold",
    fontSize: normalize(25),
  },
  bodyForm: {
    paddingHorizontal: normalize(25),
    width: "100%"
  },
  createBtn: {
    height: normalize(48),
    width: normalize(124),
    backgroundColor: color.PRIMARY
  },
  skipBtn: {
    height: normalize(48),
    width: normalize(124),
  },
  skipTitleBtn: {
    color: color.PRIMARY,
    fontWeight: 'bold',
    fontFamily: "Quicksand",
    fontSize: normalize(14),
  },
  input: {
    fontFamily: "Quicksand",
    fontSize: normalize(14),
    //color: color.PRIMARY,
    //fontWeight: 'bold'
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
    paddingHorizontal: normalize(35),
    paddingBottom: normalize(20)
  },
  labelStyle: {
    fontFamily: 'Quicksand',
    fontSize: normalize(12)
  },
  containerStyle: {
    marginTop: -normalize(20),
  }
});