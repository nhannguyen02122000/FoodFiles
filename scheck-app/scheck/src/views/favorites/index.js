import React, { useState, useEffect } from 'react'
import { color } from '../../constants/color'
import { normalize } from '../../constants/size'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { healthArtRef, dietArcRef, nutriArcRef } from '../../store/query'
import { FAVORITE } from '../../constants/language'
import storage from '@react-native-firebase/storage'

const Favorite = ({ navigation }) => {
  const [articleLst, setArtcleLst] = useState([])
  const [reactArticle, setReactArticle] = useState()
  const [loveLst, setLoveLst] = useState([])
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

  useEffect(() => {
    const func = async () => {
      if (reactArticle && reactArticle.love) {
        let loveLstTmp = []
        for (let ele of articleLst) {
          if (reactArticle.love.includes(ele.id)) {
            ele.url = ''
            if (ele.imageUrl !== '')
              ele.url = await storage().ref(ele.imageUrl).getDownloadURL()
            loveLstTmp.push(ele)
          }
        }
        setLoveLst(loveLstTmp)
      }
    }
    func()
  }, [reactArticle, articleLst])
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>{FAVORITE.TITLE}</Text>
      </View>
      <ScrollView >
        <View style={{ width: "100%", alignItems: 'center' }}>
          {loveLst.map((ele, ind) =>
            <TouchableOpacity
              key={ind}
              style={{ width: "100%" }}
              onPress={() => navigation.navigate('articleDetail', { ...ele })}
            >
              <View style={styles.article}>
                <View style={styles.content}>
                  <Text style={styles.headline}>{ele.headline}</Text>
                  <Text style={styles.summary} numberOfLines={2}>{ele.summaryContent}</Text>
                  <Text style={styles.src} numberOfLines={1}>{`Source: ${ele.source}`}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Image
                    source={{ uri: ele.url }}
                    style={styles.img}
                  />
                </View>

              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
export default Favorite
const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    backgroundColor: color.WHITE
  },
  header: {
    color: color.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  title: {
    fontFamily: "OpenSans",
    fontSize: normalize(20),
    color: color.PRIMARY
  },
  article: {
    flexDirection: 'row',
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 10,
    marginVertical: normalize(15),

  },
  content: {
    padding: normalize(15),
    width: "70%",
  },
  headline: {
    fontFamily: "OpenSans",
    fontSize: normalize(14),
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  summary: {
    fontFamily: "Quicksand",
    fontSize: normalize(13),
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  src: {
    fontFamily: "Quicksand",
    fontSize: normalize(10),
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  img: {
    width: normalize(75),
    height: normalize(75),
    borderRadius: 20,
  }
})