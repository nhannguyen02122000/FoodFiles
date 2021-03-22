import React, { useState, useEffect } from 'react'
import { color } from '../../constants/color'
import { normalize } from '../../constants/language'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { healthArtRef, dietArcRef, nutriArcRef } from '../../store/query'

const Favorite = () => {
  const [articleLst, setArtcleLst] = useState([])
  const [reactArticle, setReactArticle] = useState()
  useEffect(() => {
    const getLocalData = async () => {
      try {
        const value = await AsyncStorage.getItem('article')
        if (value !== null) {
          setReactArticle(JSON.parse(value))
        }

        const promises = []
        promises.push(healthArtRef.get().then(docLst => {
          const data = []
          docLst.forEach(doc => data.push(doc.data()))
          return data
        }))
        promises.push(dietArcRef.get().then(docLst => {
          const data = []
          docLst.forEach(doc => data.push(doc.data()))
          return data
        }))
        promises.push(nutriArcRef.get().then(docLst => {
          const data = []
          docLst.forEach(doc => data.push(doc.data()))
          return data
        }))
        await Promise.all(promises).then(values => {
          setArtcleLst([].concat(values[0], values[1], values[2]))
        });
      } catch (er) {
        console.log(er)
      }
    }
    getLocalData()
  }, [])
  console.log(articleLst.length, "hi")
  return (
    <View style={styles.screen}>
      <Text>fdsja</Text>
    </View>
  )
}
export default Favorite
const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%"
  }
})