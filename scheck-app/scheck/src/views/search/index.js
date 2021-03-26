import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'
import {
  Input,
  Button
} from 'react-native-elements'
import React, { useState, useEffect, useRef } from 'react'
import { color } from '../../constants/color'
import { normalize } from '../../constants/size'
import { SEARCH } from '../../constants/language'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ingredientRef } from '../../store/query'
import { useSelector, useDispatch } from 'react-redux'
import * as ingAction from '../../store/reducer/ingredientReducer'

const Search = ({ navigation }) => {
  const dispatch = useDispatch()
  const [itemLst, setItemLst] = useState([])
  const [prevSearch, setPrevSearch] = useState([])
  const [curSearch, setCurSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const ingLst = useSelector(state => state.ingredients.ingredients)

  useEffect(() => {
    const getIngre = async () => {
      const docLst = await ingredientRef.get()
      const data = []
      docLst.forEach(doc => {
        data.push(doc.data())
      })
      setItemLst(data)
      dispatch(ingAction.setIngredients(data))
    }
    if (ingLst.length === 0) getIngre()
    else {
      setItemLst(ingLst)
    }
    AsyncStorage.getItem('searchedValue').then(data => {
      if (data) {
        setPrevSearch(JSON.parse(data))
      }
    })
      .catch(er => console.log(er))
  }, [])
  const searchHandler = (value) => {
    setCurSearch(value)
    setFilteredData(itemLst.filter(item => item.name.toUpperCase().includes(value.toUpperCase())))
  }
  const chosenHandler = (item) => {
    if (!prevSearch.includes(item)) {
      AsyncStorage.setItem('searchedValue', JSON.stringify([item, ...prevSearch,]))
      setPrevSearch([item, ...prevSearch,])
    }
    navigation.navigate('ingredientDetail', {
      ingName: item.name,
      ingId: item.id
    })
  }
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Input
          containerStyle={styles.search}
          placeholder={SEARCH.SEARCHPLACEHOLDER}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          value={curSearch}
          onChangeText={value => searchHandler(value)}
          autoFocus
        />
      </View>
      {curSearch !== '' ?
        <View style={styles.searchOutput}>
          {filteredData.map((item, ind) =>
            <Text
              key={ind}
              style={styles.searchTxt}
              onPress={() => chosenHandler(item)}
            >
              {item.name}
            </Text>
          )}
        </View> :
        <View>
          {prevSearch.map((item, ind) =>
            <View key={ind} style={styles.prevLst}>
              <Image
                source={require('../../../assets/search/oldSearch.png')}
              />
              <Text
                style={styles.prevText}
                onPress={() => navigation.navigate('ingredientDetail', {
                  ingName: item.name,
                  ingId: item.id
                })}
              >
                {item.name}
              </Text>
            </View>
          )}
        </View>
      }
    </View>
  )
}
export default Search
const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: color.WHITE
  },
  header: {
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 4,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 1 },
    height: normalize(35),
    backgroundColor: color.WHITE,
    justifyContent: 'flex-start'
  },
  search: {
    marginLeft: normalize(40),
    alignItems: 'center',
  },
  searchOutput: {
    marginTop: normalize(10),
    paddingHorizontal: normalize(50)
  },
  searchTxt: {
    fontFamily: "Quicksand",
    fontSize: normalize(14),
    marginVertical: 5
  },
  prevLst: {
    width: "100%",
    marginLeft: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  prevText: {
    marginLeft: normalize(15),
    fontFamily: "Quicksand",
    fontSize: normalize(14),
    paddingVertical: normalize(7)
  }
})