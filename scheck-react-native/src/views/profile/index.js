import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { color } from '../../constants/color'
import { normalize } from '../../constants/size'
import { PROFILE } from '../../constants/language'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector, useDispatch } from 'react-redux'
import FloatingLabelInput from '../../components/floatingLabelInput'

const { width, height } = Dimensions.get('screen')
const Profile = (props) => {
  const [isEditProfile, setIsEditProfile] = useState(true)
  const user = useSelector(state => state.user.user)
  console.log(user.isAuthenticated)
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
        <TouchableOpacity
          style={!isEditProfile ? { ...styles.btn, ...styles.chosenBtn } : styles.btn}
          onPress={() => setIsEditProfile(false)}
        >
          <Text style={styles.btnTitle}>{PROFILE.CHANGEPASS}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
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
      </ScrollView>
    </View>
  )
}
export default Profile
const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%"
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
    width: "50%",
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
  }
})