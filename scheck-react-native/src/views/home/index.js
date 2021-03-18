import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Button
} from "react-native"
import {
  Icon,
  Input
}
  from 'react-native-elements'
import { useSelector } from 'react-redux'
import { HOME } from '../../constants/language'
import *as color from '../../constants/color'

const Home = ({ navigation }) => {
  const { user } = useSelector(state => state.user)
  return (
    <View style={styles.screen}>
      <View>
        <Icon
          reverse
          name='create'
          type='material'
          color={color.PRIMARY}
          size={36}
          containerStyle={styles.closeBtn}
        // onPress={() => props.setRegister(false)}
        />
        <Input />
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('abc')}
        />
      </View>
      <Text>{`${HOME.HI} ${user.name}`}</Text>
      <Text></Text>
    </View>
  )
}
export default Home
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: 'flex-start',
    height: "100%",
    width: "100%",
  },
})