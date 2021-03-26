import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import { color } from '../../constants/color'
import { ingredientRef } from '../../store/query'
import { normalize } from '../../constants/size'
import * as ingAction from '../../store/reducer/ingredientReducer'
import { useSelector, useDispatch } from 'react-redux'

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
    marginVertical: 5,
    fontSize: normalize(12),
    color: color.WHITE,
    textAlign: 'center',
    borderRadius: 200
  },
  otherChar: {
    marginVertical: 5,
    fontSize: normalize(12),
    textAlign: 'center',
    color: color.BLACK
  },
  alphabetWord: {
    color: color.PRIMARY,
    fontFamily: "Quicksand",
    fontSize: normalize(16),
    marginVertical: normalize(5),
  },
  word: {
    marginVertical: normalize(5),
    fontSize: normalize(14),
    fontFamily: "Quicksand",
    color: color.BLACK
  },
})
const List = ({ navigation }) => {
  const dispatch = useDispatch()
  const ingLst = useSelector(state => state.ingredients.ingredients)
  const [ingredientLst, setIngredientLst] = useState([])
  const scrollViewRef = useRef()
  const [charChosen, setCharChosen] = useState(0)
  const [charChosenByScroll, setCharChosenByScroll] = useState(0)
  useEffect(() => {
    const getIngre = async () => {
      try {
        const docLst = await ingredientRef.get()
        const dataToStore = []
        const data = []
        for (let i = 0; i < 26; i++) data.push([])
        docLst.forEach(doc => {
          dataToStore.push(doc.data())
          const letter = doc.data().name.trim().toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)
          data[letter].push(doc.data())
        })
        setIngredientLst(data)
        dispatch(ingAction.setIngredients(dataToStore))
      }
      catch (er) { console.log(er) }
    }
    if (ingLst.length === 0) getIngre()
    else {
      const data = []
      for (let i = 0; i < 26; i++) data.push([])
      ingLst.forEach(doc => {
        const letter = doc.name.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)
        data[letter].push(doc)
      })
      setIngredientLst(data)
    }
  }, [])

  useEffect(() => {
    if (scrollViewRef) {
      scrollViewRef.current.scrollTo({ y: yLocation[charChosen] + 1 })
    }
  }, [charChosen])
  const char = [<Text key={-1} style={styles.otherChar}>#</Text>]
  for (let i = 0; i < 26; i++) char.push(
    <Text
      key={i}
      style={(charChosenByScroll === i) ?
        styles.chosenChar : styles.otherChar}
      onPress={() => setCharChosen(i)}
    >
      {String.fromCharCode('A'.charCodeAt(0) + i)}
    </Text>
  )
  const ingredientShowLst = []
  try {
    for (let i = 0; i < 26; i++) {
      ingredientShowLst.push({
        name: String.fromCharCode('A'.charCodeAt(0) + i),
        style: styles.alphabetWord,
        isAlphabet: true,
        ind: i
      })
      for (let ele of ingredientLst[i]) {
        ingredientShowLst.push({
          name: ele.name.toUpperCase(),
          style: styles.word,
          id: ele.id
        })
      }
    }
  }
  catch (er) {
    console.log(er)
  }

  const [yLocation, setYLocation] = useState(Array(26))
  const handleScroll = (e) => {
    let curY = e.nativeEvent.contentOffset.y
    for (let i = 0; i < 25; i++) {
      if (yLocation[i] < curY && curY < yLocation[i + 1] && charChosenByScroll !== i) {
        setCharChosenByScroll(cur => i)
        return
      }
    }
  }

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ width: "100%", height: 25, backgroundColor: color.WHITE }}>
      </View>
      <View style={styles.screen} >

        <ScrollView
          style={{ width: "70%" }}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onScroll={handleScroll}
        >
          {ingredientShowLst.map((ele, ind) =>
            <Text
              key={ind}
              style={ele.style}
              onLayout={event => {
                const layout = event.nativeEvent.layout
                if (ele.isAlphabet) {
                  setYLocation(cur => {
                    cur[ele.ind] = layout.y
                    return cur
                  })
                }
              }}
              onPress={() => {
                if (!ele.isAlphabet)
                  navigation.navigate('ingredientDetail', {
                    ingName: ele.name,
                    ingId: ele.id
                  });
              }}
            >
              {ele.name}
            </Text>
          )}
        </ScrollView>
        <ScrollView style={styles.alphabetDict} showsVerticalScrollIndicator={false}>
          {char.map(ele => ele)}
        </ScrollView>
      </View>
    </View>
  )
}
export default List