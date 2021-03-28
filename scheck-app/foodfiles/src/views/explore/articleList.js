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
} from 'react-native-elements'
import { EXPLORE } from '../../constants/language'
import { color } from '../../constants/color'
import { normalize } from '../../constants/size'
import { nutriArcRef, healthArtRef, dietArcRef } from '../../store/query'
import storage from '@react-native-firebase/storage'
import { ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Snackbar } from 'react-native-paper'

const ArticleList = ({ navigation }) => {
  const [visible, setVisible] = useState(false)
  const [mess, setMess] = useState('')
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
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
      getLocalData()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation])
  const reactHandler = (type, id) => {
    setReactArticle(cur => {
      if (reactArticle[type].includes(id)) {
        let newAr = cur[type].filter(item => item != id)
        setMess(type === 'love' ? EXPLORE.REMOVEFAVORITE : EXPLORE.REMOVEBOOKMARK)
        setVisible(true)
        return {
          ...cur,
          [type]: newAr
        }
      }
      else {
        setMess(type === 'love' ? EXPLORE.ADDFAVORITE : EXPLORE.ADDBOOKMARK)
        setVisible(true)
        return {
          ...cur,
          [type]: [].concat(cur[type], [id])
        }
      }
    })
  }

  let remainArticle = []

  for (let i = 1; i < articleLst.length; i++) {
    remainArticle.push(
      <TouchableOpacity
        key={i}
        onPress={() => navigation.navigate('articleDetail', { ...articleLst[i] })}
      >
        <View style={styles.demoComp} >
          <Image source={{ uri: articleLst[i].url }} style={styles.demoImg} />
          <Text style={styles.demoHeadline}>{articleLst[i].headline}</Text>
        </View>
      </TouchableOpacity>
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
        <ScrollView>
          <View style={styles.body}>
            <View style={{ paddingHorizontal: normalize(20), width: "100%" }}>
              <View style={styles.mainComp}>
                <ImageBackground
                  source={{ uri: articleLst[0].url }}
                  style={styles.mainImg}
                  imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                >
                  <Text style={styles.mainHeadline}>{articleLst[0].headline}</Text>
                </ImageBackground>
                <Text style={styles.mainSummary}>{articleLst[0].summaryContent}</Text>
                <View style={styles.mainBtnGr}>
                  <Button
                    buttonStyle={styles.readBtn}
                    title={EXPLORE.READ}
                    titleStyle={{ fontSize: 12 }}
                    onPress={() => navigation.navigate('articleDetail', { ...articleLst[0] })}
                  />

                  <View style={styles.iconBtn}>
                    <TouchableOpacity onPress={() => reactHandler("love", articleLst[0].id)}>
                      <Image
                        source={
                          reactArticle.love &&
                            reactArticle.love.includes(articleLst[0].id) ?
                            require('../../../assets/explore/loveFulfill.png') :
                            require('../../../assets/explore/love.png')
                        }
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => reactHandler("bookmark", articleLst[0].id)}>
                      <Image
                        source={
                          reactArticle.bookmark &&
                            reactArticle.bookmark.includes(articleLst[0].id) ?
                            require('../../../assets/explore/bookmarkFulfill.png') :
                            require('../../../assets/explore/bookmark.png')
                        }
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.readmoreContainer}>
              <Text style={styles.readmoreTxt}>{EXPLORE.READMORE}</Text>
            </View>
            <Snackbar
              visible={visible}
              onDismiss={() => setVisible(false)}
              style={{
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.36,
                shadowRadius: 6.68,

                elevation: 11,
                marginBottom: 50
              }}
            >
              <Text style={{ color: 'black' }}>{mess}</Text>
            </Snackbar>
            <ScrollView horizontal style={{ width: "100%", height: "100%" }}>
              {remainArticle.map(ele => ele)}
            </ScrollView>

          </View>
        </ScrollView>
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
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 10,
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
    width: normalize(100),
    backgroundColor: color.WHITE,
    borderRadius: 50
  },
  title: {
    fontFamily: "Quicksand",
    color: 'rgba(0, 0, 0, 0.38)',
    textAlign: 'left',
    fontSize: normalize(12)
  },
  chosenBtn: {
    backgroundColor: color.PRIMARY,
  },
  chosenTitle: {
    color: color.WHITE,
  },
  body: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: normalize(20)
  },
  mainImg: {
    borderRadius: 40,
    maxWidth: '100%',
    //width: normalize(500),
    height: normalize(130)
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
    justifyContent: 'space-between'
  },
  readmoreContainer: {
    marginVertical: normalize(16),
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
    height: normalize(160),
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
    fontSize: normalize(11),
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 'bold'
  }
})