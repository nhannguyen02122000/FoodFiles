import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import {
  Button,
  Icon,

} from 'react-native-elements'
import { EXPLORE } from '../../constants/language'
import { color } from '../../constants/color'
import { normalize } from '../../constants/size'
import { nutriArcRef, healthArtRef, dietArcRef } from '../../store/query'
import storage from '@react-native-firebase/storage'
import { ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ArticleList = () => {
  const [selectedArticleType, setSelectedArticleType] = useState(0)
  const [articleLst, setArticleLst] = useState([])
  const [reactArticle, setReactArticle] = useState({ love: [], bookmark: [] })


  useEffect(() => {
    const getData = async () => {
      const response = await healthArtRef.get()
      let data = []

      response.forEach(doc => {
        data.push(doc.data())
      })

      for (let item of data) {
        if (item.imageUrl !== '') item.url = await storage().ref(item.imageUrl).getDownloadURL()
        else item.url = ''
      }
      setArticleLst(data)
    }
    const getLocalData = async () => {
      try {
        const value = await AsyncStorage.getItem('article')
        if (value !== null) {
          setReactArticle(JSON.parse(value))
        }
      } catch (er) {
        console.log(er)
      }
    }
    getData()
    getLocalData()
  }, [])
  useEffect(() => {
    const refLst = [healthArtRef, nutriArcRef, dietArcRef]
    const getData = async () => {
      const response = await refLst[selectedArticleType].get()
      let data = []

      response.forEach(doc => {
        data.push(doc.data())
      })
      for (let item of data) {
        if (item.imageUrl && item.imageUrl !== '') item.url = await storage().ref(item.imageUrl).getDownloadURL()
        else item.url = ''
      }
      setArticleLst(data)
    }
    getData()
  }, [selectedArticleType])
  useEffect(() => {
    AsyncStorage.setItem('article', JSON.stringify(reactArticle))
  }, [reactArticle])
  const loveHandler = (id) => {
    if (reactArticle.love.includes(id)) return
    setReactArticle(cur => ({
      ...cur,
      love: [].concat(cur.love, [id])
    }))
  }
  const bookmarkHandler = (id) => {
    if (reactArticle.bookmark.includes(id)) return
    setReactArticle(cur => ({
      ...cur,
      bookmark: [].concat(cur.bookmark, [id])
    }))
  }

  let remainArticle = []

  for (let i = 1; i < articleLst.length; i++) {
    remainArticle.push(
      <View style={styles.demoComp} key={i}>
        <Image source={{ uri: articleLst[i].url }} style={styles.demoImg} />
        <Text style={styles.demoHeadline}>{articleLst[i].headline}</Text>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Button
          title={EXPLORE.HEALTH}
          titleStyle={selectedArticleType === 0 ? { ...styles.title, ...styles.chosenTitle } : styles.title}
          buttonStyle={selectedArticleType === 0 ? { ...styles.btn, ...styles.chosenBtn } : styles.btn}
          onPress={() => setSelectedArticleType(0)}
        />
        <Button
          title={EXPLORE.NUTRITION}
          titleStyle={selectedArticleType === 1 ? { ...styles.title, ...styles.chosenTitle } : styles.title}
          buttonStyle={selectedArticleType === 1 ? { ...styles.btn, ...styles.chosenBtn } : styles.btn}
          onPress={() => setSelectedArticleType(1)}
        />
        <Button
          title={EXPLORE.DIET}
          titleStyle={selectedArticleType === 2 ? { ...styles.title, ...styles.chosenTitle } : styles.title}
          buttonStyle={selectedArticleType === 2 ? { ...styles.btn, ...styles.chosenBtn } : styles.btn}
          onPress={() => setSelectedArticleType(2)}
        />
      </View>
      {articleLst.length > 0 ?
        <View style={styles.body}>
          <View style={{ paddingHorizontal: normalize(20), width: "100%" }}>
            <View style={styles.mainComp}>
              <ImageBackground
                source={{ uri: articleLst[0].url }}
                style={styles.mainImg}
              >
                <Text style={styles.mainHeadline}>{articleLst[0].headline}</Text>
              </ImageBackground>
              <Text style={styles.mainSummary}>{articleLst[0].summaryContent}</Text>
              <View style={styles.mainBtnGr}>
                <Button
                  buttonStyle={styles.readBtn}
                  title={EXPLORE.READ}
                />
                <View style={styles.iconBtn}>
                  <TouchableOpacity onPress={() => loveHandler(articleLst[0].id)}>
                    <Image
                      source={require('../../../assets/explore/love.png')}
                      style={reactArticle.love && reactArticle.love.includes(articleLst[0].id) ? { tintColor: 'red' } : null}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => bookmarkHandler(articleLst[0].id)}>
                    <Image
                      source={require('../../../assets/explore/bookmark.png')}
                      style={reactArticle.bookmark && reactArticle.bookmark.includes(articleLst[0].id) ? { tintColor: '#FFC529' } : null}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.readmoreContainer}>
            <Text style={styles.readmoreTxt}>{EXPLORE.READMORE}</Text>
          </View>
          <ScrollView horizontal style={{ width: "100%", height: "100%" }}>
            {remainArticle.map(ele => ele)}
          </ScrollView>
        </View>
        : null}
    </View >
  )
}
export default ArticleList
const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: color.BACKGROUND
  },
  header: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.WHITE,
    paddingTop: normalize(40),
    paddingHorizontal: normalize(15),
    paddingBottom: normalize(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  btn: {
    width: 150,
    backgroundColor: color.WHITE,
    borderRadius: 50
  },
  title: {
    fontFamily: "Quicksand",
    color: 'rgba(0, 0, 0, 0.38)'
  },
  chosenBtn: {
    backgroundColor: color.PRIMARY
  },
  chosenTitle: {
    color: color.WHITE
  },
  body: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: normalize(20)
  },
  mainImg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxWidth: '100%',
    //width: normalize(500),
    height: normalize(150)
  },
  mainComp: {
    backgroundColor: color.WHITE,
    width: "100%",
    //alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20
  },
  mainHeadline: {
    color: color.WHITE,
    fontSize: normalize(14),
    padding: normalize(10),
    marginTop: normalize(80),
    fontFamily: "OpenSans",
    fontWeight: 'bold'
  },
  mainSummary: {
    marginVertical: normalize(15),
    marginLeft: normalize(10),
    fontFamily: "Quicksand",
    fontSize: normalize(12),
    color: 'rgba(0, 0, 0, 0.6)'
  },
  mainBtnGr: {
    marginHorizontal: normalize(10),
    flexDirection: 'row',
    marginBottom: normalize(10),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  readBtn: {
    backgroundColor: color.PRIMARY,
    width: normalize(99)
  },
  iconBtn: {
    flexDirection: 'row',
    width: normalize(40),
    justifyContent: 'space-between'
  },
  readmoreContainer: {
    marginTop: normalize(10),
    justifyContent: 'flex-start',
    width: "100%",
    marginLeft: normalize(40)
  },
  readmoreTxt: {
    fontFamily: "OpenSans",
    fontSize: normalize(14),
    color: color.PRIMARY
  },
  demoComp: {
    margin: normalize(10),
    marginBottom: 20,
    width: normalize(180),
    height: normalize(150),
    backgroundColor: color.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20
  },
  demoImg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: normalize(500),
    maxWidth: "100%",
    height: normalize(100)
  },
  demoHeadline: {
    padding: normalize(10),
    fontFamily: "OpenSans",
    fontSize: normalize(12),
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 'bold'
  }
})