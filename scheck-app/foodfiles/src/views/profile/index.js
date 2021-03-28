import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import { color } from '../../constants/color'
import { normalize } from '../../constants/size'
import { PROFILE } from '../../constants/language'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector, useDispatch } from 'react-redux'
import FloatingLabelInput from '../../components/floatingLabelInput'
import { Picker } from '@react-native-picker/picker'
import { Button } from 'react-native-elements'
import * as userAction from '../../store/reducer/userReducer'
import { userRef } from '../../store/query'
import auth from '@react-native-firebase/auth'

const { width, height } = Dimensions.get('screen')
const Profile = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading1, setIsLoading1] = useState(false)
  const [isEditProfile, setIsEditProfile] = useState(true)
  const user = useSelector(state => state.user.user)
  const [userInfo, setUserInfo] = useState({})
  const dispatch = useDispatch()
  useEffect(() => { setUserInfo(user) }, [user])

  const saveHandler = () => {
    setIsLoading(true)
    dispatch(userAction.setUser(userInfo))
    userRef.doc(userInfo.id).set({
      fullname: userInfo.fullname,
      goal: userInfo.goal,
      age: userInfo.age,
      height: userInfo.height,
      weight: userInfo.weight,
      gender: userInfo.gender,
    }, { merge: true })
      .then(() => setIsLoading(false))
      .catch(er => console.log(er))
  }
  if (!user.isAuthenticated) return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['rgba(255, 197, 41, 0.8)', '#F27E4C']}
        style={styles.header}
      >
      </LinearGradient >
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{PROFILE.ERR}</Text>
      </View>
    </View>
  )
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['rgba(255, 197, 41, 0.8)', '#F27E4C']}
        style={styles.header}
      >
      </LinearGradient >
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={isEditProfile ? { ...styles.btn, ...styles.chosenBtn } : styles.btn}
          onPress={() => setIsEditProfile(true)}
        >
          <Text style={styles.btnTitle}>{PROFILE.EDITPROFILE}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.body}>
          <FloatingLabelInput
            labelStyle={styles.labelStyle}
            label={PROFILE.NAME}
            placeholder={PROFILE.NAME}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            value={userInfo.fullname}
            onChangeText={value => setUserInfo(user => ({ ...user, fullname: value }))}
          />
          <View style={{ marginBottom: normalize(10), marginTop: -20 }}>
            <Text
              style={{ ...styles.labelStyle, paddingLeft: 11 }}
            >
              {PROFILE.GENDER}
            </Text>
            <Picker
              style={{ marginLeft: normalize(9), color: color.BLACK }}
              selectedValue={userInfo.gender}
              onValueChange={(itemValue, itemIndex) =>
                setUserInfo(user => ({ ...user, gender: itemValue }))
              }
            >
              <Picker.Item label={PROFILE.MALE} value={PROFILE.MALE} />
              <Picker.Item label={PROFILE.FEMALE} value={PROFILE.FEMALE} />
              <Picker.Item label={PROFILE.OTHER} value={PROFILE.OTHER} />
            </Picker>
          </View>
          <FloatingLabelInput
            labelStyle={styles.labelStyle}
            label={PROFILE.AGE}
            placeholder={PROFILE.AGE}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            value={userInfo.age}
            keyboardType="numeric"
            onChangeText={value => setUserInfo(user => ({ ...user, age: value }))}
          />
          <FloatingLabelInput
            labelStyle={styles.labelStyle}
            label={PROFILE.HEIGHTLABEL}
            placeholder={PROFILE.HEIGHT}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            value={userInfo.height}
            keyboardType="numeric"
            onChangeText={value => setUserInfo(user => ({ ...user, height: value }))}
          />
          <FloatingLabelInput
            labelStyle={styles.labelStyle}
            label={PROFILE.WEIGHTLABEL}
            placeholder={PROFILE.WEIGHT}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            value={userInfo.weight}
            keyboardType="numeric"
            onChangeText={value => setUserInfo(user => ({ ...user, weight: value }))}
          />
          <View style={{ marginBottom: normalize(10), marginTop: -20 }}>
            <Text
              style={{ ...styles.labelStyle, paddingLeft: 11 }}
            >
              {PROFILE.GOAL}
            </Text>
            <Picker
              style={{ marginLeft: normalize(9), color: color.BLACK }}
              selectedValue={userInfo.goal}
              onValueChange={(itemValue, itemIndex) =>
                setUserInfo(user => ({ ...user, goal: itemValue }))
              }
            >
              <Picker.Item label={PROFILE.GAINWEIGHT} value={PROFILE.GAINWEIGHT} />
              <Picker.Item label={PROFILE.LOSEWEIGHT} value={PROFILE.LOSEWEIGHT} />
              <Picker.Item label={PROFILE.MAINTAINWEIGHT} value={PROFILE.MAINTAINWEIGHT} />
            </Picker>
            <Button
              titleStyle={{ fontSize: normalize(14) }}
              title={PROFILE.SAVE}
              type="solid"
              buttonStyle={styles.btnSave}
              onPress={saveHandler}
              disabled={isLoading}
              loading={isLoading}
            />
          </View>
        </View>
        <Button
          titleStyle={{ fontSize: normalize(14) }}
          buttonStyle={styles.passBtn}
          title={PROFILE.CHANGEPASSBTN}
          onPress={async () => {
            setIsLoading1(true)
            try {
              await auth().sendPasswordResetEmail(userInfo.email)
              setIsLoading1(false)
              Alert.alert('Please check your mailbox')
            }
            catch (er) {
              Alert.alert('Some error happens, please try again')
              setIsLoading1(false)
            }
          }
          }
          loading={isLoading1}
          disabled={isLoading1}
        />
      </ScrollView>
    </View>
  )
}
export default Profile
const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: color.WHITE
  },
  header: {
    height: height / 4,
    alignItems: 'center',
    width: "100%",
    elevation: 0
  },
  btnGroup: {
    flexDirection: 'row',
    width: '100%'
  },
  btn: {
    width: "100%",
    alignItems: 'center',
    padding: normalize(15),
  },
  btnTitle: {
    color: color.PRIMARY,
    fontWeight: '500',
    fontSize: normalize(14)
  },
  chosenBtn: {
    borderBottomColor: color.PRIMARY,
    borderBottomWidth: normalize(3)
  },
  body: {
    width: "100%",
    padding: normalize(20)
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Quicksand',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  containerStyle: {
    marginTop: -normalize(5),
  },
  btnSave: {
    marginTop: normalize(10),
    backgroundColor: color.PRIMARY,
    padding: 10
  },
  passBtn: {
    backgroundColor: color.PRIMARY,
    marginHorizontal: normalize(20),
    marginBottom: 20
  }
})