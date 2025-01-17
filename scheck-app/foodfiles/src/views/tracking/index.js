import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native'
import { color } from '../../constants/color'
import {
  Icon,
  Overlay
} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { TRACKING } from '../../constants/language'
import { Button } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { userRef } from '../../store/query'
import { normalize } from '../../constants/size'
import FloatingLabelInput from '../../components/floatingLabelInput'
import { Picker } from '@react-native-picker/picker'

const { width, height } = Dimensions.get('screen')
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: color.BACKGROUND,
    alignItems: 'center'
  },
  linearGradient: {
    height: normalize(200),
    borderRadius: normalize(200),
    width: normalize(200),
    marginTop: -normalize(25),
    margin: 0,
    padding: 0,
    shadowColor: color.BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  calcText: {
    color: color.PRIMARY,
    fontSize: normalize(20),
    fontFamily: "QuickSand",
    textAlign: 'center'
  },
  outputCalcText: {
    textAlign: 'center',
    color: color.WHITE,
    fontFamily: 'Quicksand',
    fontSize: normalize(30),
    fontWeight: 'bold'
  },
  btnContainer: {
    marginTop: normalize(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    height: height / 5,
    paddingHorizontal: normalize(30),
  },
  btnOpa: {
    backgroundColor: color.WHITE,
    borderRadius: 10,
    //marginBottom: normalize(17),
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 4,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 1 },
  },
  btn: {
    borderRadius: 10,
    width: normalize(150),
    backgroundColor: color.WHITE,
    justifyContent: 'flex-start'
  },
  btnCalcOpa: {
    //marginBottom: normalize(17),
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 4,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 1 },
    height: "100%"
  },
  calcBtn: {
    borderRadius: 10,
    width: normalize(150),
    backgroundColor: color.PRIMARY,
    justifyContent: 'flex-start',
    height: "100%",
    flexDirection: 'column',
    justifyContent: 'center'
  },
  header: {
    height: 55,
    backgroundColor: color.WHITE,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnTitle: {
    color: color.PRIMARY,
    fontSize: normalize(14),
    fontFamily: "Quicksand",
    paddingLeft: normalize(10),
  }
})
const Tracking = (props) => {
  const user = useSelector(state => state.user.user)
  const [info, setInfo] = useState({
    age: TRACKING.AGE,
    weight: TRACKING.WEIGHT,
    height: TRACKING.HEIGHT,
    gender: "Other"
  })
  const [modal, setModal] = useState(false)
  const [err, setErr] = useState('')
  const [calories, setCalories] = useState('')
  useEffect(() => {
    if (!user.id) return
    const fetchInfoUser = async () => {
      const response = await userRef.doc(user.id).get()
      const newInfo = {}

      if (response.data().age && response.data().age !== '') newInfo.age = response.data().age
      if (response.data().weight && response.data().weight !== '') newInfo.weight = response.data().weight
      if (response.data().height && response.data().height !== '') newInfo.height = response.data().height
      newInfo.gender = response.data().gender
      setInfo(cur => ({
        ...cur,
        ...newInfo
      }))
    }
    fetchInfoUser()
  }, [])
  const calcHandler = () => {
    if (info.age === TRACKING.AGE) {
      setErr(TRACKING.PLEASEAGE)
      setModal(true)
      return
    }
    if (info.height === TRACKING.HEIGHT) {
      setErr(TRACKING.PLEASEHEIGHT)
      setModal(true)
      return
    }
    if (info.weight === TRACKING.WEIGHT) {
      setErr(TRACKING.PLEASEWEIGHT)
      setModal(true)
      return
    }
    if (info.gender === TRACKING.MALE) {
      setCalories(10 * info.weight + 6.25 * info.height - 5 * info.age + 5)
    }
    else {
      setCalories(10 * info.weight + 6.25 * info.height - 5 * info.age - 161)
    }
    setModal(false)
  }
  return (
    <View style={styles.screen} >
      <View style={styles.header} ></View>
      <View style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: color.BACKGROUND }}>
        {/* <View style={{ width: "100%", height: 200, backgroundColor: 'blue' }}> */}
        <LinearGradient
          colors={calories !== '' ? ['#F27E4C', 'rgba(255, 197, 41, 0.8)'] : [color.WHITE, color.WHITE]}
          style={styles.linearGradient}
        >
          <Text style={calories === '' ? styles.calcText : styles.outputCalcText}>
            {calories === '' ? TRACKING.DAILYCAL : calories}
          </Text>
          {calories !== '' ? <Text style={{ color: color.WHITE, fontSize: normalize(20), fontFamily: 'Quicksand' }}>kcal</Text> : null}
        </LinearGradient >
        {/* </View> */}
        <View style={styles.btnContainer}>
          <View style={{ height: height / 5, flexDirection: 'column', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.btnOpa} >
              <Button
                icon={
                  <Image source={require('../../../assets/tracking/age.png')} />
                }
                title={info.age === TRACKING.AGE ? info.age : `${info.age} yr`}
                titleStyle={styles.btnTitle}
                buttonStyle={styles.btn}
                onPress={() => { setErr(''); setModal(true) }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOpa} >
              <Button
                icon={
                  <Image source={require('../../../assets/tracking/height.png')} />
                }
                title={info.height === TRACKING.HEIGHT ? info.height : `${info.height} cm`}
                buttonStyle={styles.btn}
                titleStyle={styles.btnTitle}
                onPress={() => { setErr(''); setModal(true) }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOpa} >
              <Button
                icon={
                  <Image source={require('../../../assets/tracking/weight.png')} />
                }
                title={info.weight === TRACKING.WEIGHT ? info.weight : `${info.weight} kg`}
                buttonStyle={styles.btn}
                titleStyle={styles.btnTitle}
                onPress={() => { setErr(''); setModal(true) }}
              />
            </TouchableOpacity>
            <Overlay isVisible={modal} onBackdropPress={() => setModal(false)} >
              <Text style={{ color: color.DANGEROUS }}>{err}</Text>
              <FloatingLabelInput
                label={TRACKING.AGE}
                placeholder={TRACKING.AGE}
                containerStyle={{ width: normalize(200) }}
                value={info.age === TRACKING.AGE ? '' : info.age}
                keyboardType="numeric"
                onChangeText={(value) => setInfo(cur => ({ ...cur, age: value }))}
              />
              <FloatingLabelInput
                label={TRACKING.HEIGHT}
                placeholder={TRACKING.HEIGHT}
                containerStyle={{ width: normalize(200) }}
                value={info.height === TRACKING.HEIGHT ? '' : info.height}
                keyboardType="numeric"
                onChangeText={(value) => setInfo(cur => ({ ...cur, height: value }))}
              />
              <FloatingLabelInput
                label={TRACKING.WEIGHT}
                placeholder={TRACKING.WEIGHT}
                containerStyle={{ width: normalize(200) }}
                value={info.weight === TRACKING.WEIGHT ? '' : info.weight}
                keyboardType="numeric"
                onChangeText={(value) => setInfo(cur => ({ ...cur, weight: value }))}
              />
              <Text
                style={{ paddingLeft: normalize(7) }}
              >
                {TRACKING.GENDER}
              </Text>
              <Picker
                style={{ width: normalize(200) }}
                selectedValue={info.gender}
                onValueChange={(itemValue, itemIndex) =>
                  setInfo(cur => ({ ...cur, gender: itemValue }))
                }
              >
                <Picker.Item label={TRACKING.MALE} value={TRACKING.MALE} />
                <Picker.Item label={TRACKING.FEMALE} value={TRACKING.FEMALE} />
                <Picker.Item label={TRACKING.OTHER} value={TRACKING.OTHER} />
              </Picker>
              <Button
                title={TRACKING.CALC}
                buttonStyle={{ backgroundColor: color.PRIMARY }}
                onPress={calcHandler}
              />
            </Overlay>
          </View>
          <View style={{ height: height / 5 }}>
            <TouchableOpacity style={styles.btnCalcOpa} >
              <Button
                icon={
                  <Image source={require('../../../assets/tracking/flame.png')} />
                }
                title={TRACKING.CALC}
                buttonStyle={styles.calcBtn}
                titleStyle={{ fontSize: normalize(16) }}
                onPress={calcHandler}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
export default Tracking