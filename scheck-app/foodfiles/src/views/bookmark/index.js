import React, { useState, useEffect } from 'react'
import { color } from '../../constants/color'
import { normalize } from '../../constants/size'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { healthArtRef, dietArcRef, nutriArcRef } from '../../store/query'
import { BOOKMARK } from '../../constants/language'
import storage from '@react-native-firebase/storage'

const { width, height } = Dimensions.get('screen')
const Favorite = ({ navigation }) => {
  const [additives, setAdditives] = useState([])
  const [articleLst, setArtcleLst] = useState([])
  const [reactArticle, setReactArticle] = useState()
  const [bookmarkLst, setBookmarkLst] = useState([])
  useEffect(() => {
    const getLocalData = async () => {
      try {
        const value = await AsyncStorage.getItem('article')
        if (value !== null) {
          setReactArticle(JSON.parse(value))
        }
        const value1 = await AsyncStorage.getItem('additive')
        if (value1 !== null) {
          setAdditives(JSON.parse(value1))
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
        let bookmarkLstTmp = []
        for (let ele of articleLst) {
          if (reactArticle.bookmark.includes(ele.id)) {
            ele.url = ''
            if (ele.imageUrl !== '')
              ele.url = await storage().ref(ele.imageUrl).getDownloadURL()
            bookmarkLstTmp.push(ele)
          }
        }
        setBookmarkLst(bookmarkLstTmp)
      }
    }
    func()
  }, [reactArticle, articleLst])

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>{BOOKMARK.TITLE}</Text>
      </View>
      <View style={styles.subjectContainer}>
        <Text style={styles.subject}>{BOOKMARK.ADDITIVE}</Text>
      </View>
      <ScrollView style={{ width: "100%", height: height * 1 / 3 }}>
        {additives.map((ele, ind) =>
          <TouchableOpacity
            key={ind}
            style={{ width: "100%", paddingLeft: normalize(20) }}
            onPress={() => navigation.navigate('ingredientDetail', {
              ingName: ele.name,
              ingId: ele.id
            })}
          >
            <Text style={styles.headline}>{ele.name}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <View style={styles.subjectContainer}>
        <Text style={styles.subject}>{BOOKMARK.ARTICLE}</Text>
      </View>
      <ScrollView >
        <View style={{ width: "100%", alignItems: 'center', height: height * 2 / 3 }}>
          {bookmarkLst.map((ele, ind) =>
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
    backgroundColor: color.B
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
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
  },
  subject: {
    fontWeight: '400',
    fontFamily: "OpenSans",
    fontSize: normalize(20),
    textAlign: 'left',
    paddingLeft: normalize(20),
    color: color.BLACK
  },
  subjectContainer: {
    width: "100%",
    alignItems: 'flex-start',
    marginTop: normalize(20)
  }
})