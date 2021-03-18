import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { color } from '../../constants/color'
import {
  Icon,
  Input,
  normalize
} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { TRACKING } from '../../constants/language'
import { Button } from 'react-native-elements'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: color.BACKGROUND,
    alignItems: 'center'
  },
  linearGradient: {
    marginTop: normalize(70),
    height: normalize(300),
    borderRadius: normalize(200),
    width: normalize(300),
    shadowColor: color.BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  calcText: {
    color: color.PRIMARY,
    fontSize: normalize(32),
    fontFamily: "QuickSand",
    textAlign: 'center'
  },
  btnContainer: {
    marginTop: normalize(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    paddingHorizontal: normalize(100)
  },
  btn: {
    width: "80%"
  }
})
const Tracking = (props) => {
  const [isCalculated, setIscalculated] = useState(false)
  return (
    <View style={styles.screen} >
      <LinearGradient
        colors={isCalculated ? ['#F27E4C', 'rgba(255, 197, 41, 0.8)'] : [color.WHITE, color.WHITE]}
        useAngle={true}
        angle={270}
        angleCenter={{
          x: 0, y: 0
        }}
        style={styles.linearGradient}
      >
        <Text style={styles.calcText}>
          {TRACKING.DAILYCAL}
        </Text>
      </LinearGradient >
      <View style={styles.btnContainer}>
        <View>
          <Button
            title="a"
            buttonStyle={styles.btn}
          />
          <Button
            title="b"
            buttonStyle={styles.btn}
          />
          <Button
            title="c"
            buttonStyle={styles.btn}
          />
        </View>
        <View>
          <Button
            title="calculate"
          />
        </View>
      </View>
    </View>
  )
}
export default Tracking