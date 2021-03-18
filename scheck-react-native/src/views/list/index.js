import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'
import { color } from '../../constants/color'
import {
  Icon,
  Input,
} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { ingredientRef } from '../../store/query'
import { FlatList } from 'react-native';
import { normalize } from '../../constants/size'

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    height: "100%",
    width: "100%",
    backgroundColor: color.BACKGROUND,
    //alignItems: 'center',
    padding: normalize(20),
    justifyContent: 'flex-end'
  },
  alphabetDict: {
    height: "100%",
    paddingLeft: "25%",
  },
  chosenChar: {
    backgroundColor: color.PRIMARY,
    marginVertical: normalize(2),
    fontSize: normalize(12),
    color: color.WHITE,
    textAlign: 'center',
    borderRadius: 200
  },
  otherChar: {
    marginVertical: normalize(2),
    fontSize: normalize(12),
    textAlign: 'center',
    color: color.BLACK
  }
})
const List = (props) => {
  const [ingredientLst, setIngredientLst] = useState([])

  useEffect(() => {
    ingredientRef.get().then(docLst => {
      const data = []
      for (let i = 0; i < 26; i++) data.push([])
      console.log(data)
      docLst.forEach(doc => {
        console.log(doc.data().name)
        const letter = doc.data().name.charCodeAt(0) - 'A'.charCodeAt(0)
        console.log(letter, data[letter])
        data[letter].push(doc.data())
      })
      console.log(data)
      setIngredientLst(data)
    }).catch(er => console.log(er))
  }, [])

  const [charChosen, setCharChosen] = useState(0)
  const char = [<Text key={-1} style={styles.otherChar}>#</Text>]
  for (let i = 0; i < 26; i++) char.push(
    <Text
      key={i}
      style={charChosen === i ?
        styles.chosenChar : styles.otherChar}
      onPress={() => setCharChosen(i)}
    >
      {String.fromCharCode('A'.charCodeAt(0) + i)}
    </Text>
  )
  const ingredientShowLst = []

  return (
    <View style={styles.screen} >
      <ScrollView style={{ width: "70%" }}>
        {ingredientLst.map((ele, ind) => <Text key={ind}>{ele.name}</Text>)}
      </ScrollView>
      <ScrollView style={styles.alphabetDict}>
        {char.map(ele => ele)}
      </ScrollView>
    </View>
  )
}
export default List