import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import { color } from '../../constants/color'
import { ARCDETAIL } from '../../constants/language'
import { normalize } from '../../constants/size'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Snackbar } from 'react-native-paper'

const { width, height } = Dimensions.get('screen')
const ArticleDetail = ({ route }) => {
  const [visible, setVisible] = useState(false)
  const [mess, setMess] = useState('')
  const articleInfo = route.params
  const [reactArticle, setReactArticle] = useState({ love: [], bookmark: [] })
  useEffect(() => {
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
  }, [])
  if (!articleInfo.id) return (
    <View style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}>
      <Text>Information can not be found</Text>
    </View>
  )
  const reactHandler = (type, id) => {
    setReactArticle(cur => {
      if (reactArticle[type].includes(id)) {
        let newAr = cur[type].filter(item => item != id)
        return {
          ...cur,
          [type]: newAr
        }
      }
      else {
        return {
          ...cur,
          [type]: [].concat(cur[type], [id])
        }
      }
    })
  }
  useEffect(() => {
    AsyncStorage.setItem('article', JSON.stringify(reactArticle))
  }, [reactArticle])
  return (
    <View style={styles.screen}>
      <ImageBackground
        source={articleInfo.url ? { uri: articleInfo.url } : require('../../../assets/explore/articleDefault.png')}
        style={styles.articleImg}
      />
      <TouchableOpacity
        style={reactArticle.love &&
          reactArticle.love.includes(articleInfo.id) ?
          { ...styles.iconcontainer, ...styles.chosenLoveContainer } : styles.iconcontainer}
        onPress={() => {
          reactHandler("love", articleInfo.id)
          setMess(reactArticle.love.includes(articleInfo.id) ? ARCDETAIL.REMOVEFAVORITE : ARCDETAIL.ADDFAVORITE)
          setVisible(true)
        }}
      >
        <Image
          source={require('../../../assets/explore/loveFulfill.png')}
          style={reactArticle.love &&
            reactArticle.love.includes(articleInfo.id) ?
            { ...styles.icon, ...styles.chosenLove } : styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={reactArticle.bookmark &&
          reactArticle.bookmark.includes(articleInfo.id) ?
          { ...styles.iconcontainerBookmark, ...styles.chosenBookmarkContainer } : styles.iconcontainerBookmark}
        onPress={() => {
          reactHandler("bookmark", articleInfo.id)
          setMess(reactArticle.bookmark.includes(articleInfo.id) ? ARCDETAIL.REMOVEBOOKMARK : ARCDETAIL.ADDBOOKMARK)
          setVisible(true)
        }}
      >
        <Image
          source={require('../../../assets/explore/bookmarkFulfill.png')}
          style={reactArticle.bookmark &&
            reactArticle.bookmark.includes(articleInfo.id) ?
            { ...styles.iconBookmark, ...styles.chosenLove } : styles.iconBookmark}
        />
      </TouchableOpacity>
      <ScrollView style={styles.body}>
        <Text style={styles.category}>
          {articleInfo.category.toUpperCase()}
        </Text>
        <Text style={styles.headline}>
          {`${ARCDETAIL.SRC}: ${articleInfo.source}`}
        </Text>
        <Text style={styles.title}>
          {articleInfo.headline}
        </Text>
        <Text style={styles.summary}>
          {articleInfo.summaryContent}
        </Text>
        <Text style={styles.content}>
          {articleInfo.content}
        </Text>
      </ScrollView>
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
        }}
      >
        <Text style={{ color: 'black' }}>{mess}</Text>
      </Snackbar>
    </View>
  )
}
export default ArticleDetail
const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: color.WHITE
  },
  articleImg: {
    width: "100%",
    height: height / 3
  },
  body: {
    width: "100%",
    backgroundColor: color.WHITE
  },
  category: {
    backgroundColor: color.PRIMARY,
    color: color.WHITE,
    fontFamily: 'Quicksand',
    fontSize: normalize(12),
    width: normalize(85),
    padding: normalize(10),
    margin: normalize(20),
    textAlign: 'center',
    borderRadius: 10
  },
  headline: {
    fontSize: normalize(14),
    fontFamily: "Quicksand",
    flexWrap: 'wrap',
    marginHorizontal: normalize(20),
    color: 'rgba(0, 0, 0, 0.6)'
  },
  title: {
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: 'OpenSans',
    fontSize: normalize(20),
    marginHorizontal: normalize(20),
    marginTop: normalize(18),
    marginBottom: normalize(8),
    textAlign: 'justify'
  },
  content: {
    marginHorizontal: normalize(20),
    fontFamily: 'Quicksand',
    fontSize: normalize(14),
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: normalize(50),
    textAlign: 'justify'
  },
  summary: {
    marginHorizontal: normalize(20),
    fontFamily: 'Quicksand',
    fontSize: normalize(14),
    color: 'rgba(0, 0, 0, 0.38)',
    marginBottom: normalize(10),
    textAlign: 'justify'
  },
  icon: {
    width: "100%",
    height: "100%",
    tintColor: color.HEART
  },
  iconBookmark: {
    width: "100%",
    height: "100%",
    tintColor: color.BOOKMARK
  },
  iconcontainer: {
    width: normalize(50),
    height: normalize(50),
    padding: normalize(15),
    backgroundColor: color.WHITE,
    borderRadius: 50,
    position: 'absolute',
    marginTop: height * 2.9 / 10,
    marginLeft: width * 2 / 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 10,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 1 },
  },
  iconcontainerBookmark: {
    width: normalize(50),
    height: normalize(50),
    padding: normalize(15),
    backgroundColor: color.WHITE,
    borderRadius: 50,
    position: 'absolute',
    marginTop: height * 2.9 / 10,
    marginLeft: width * 2.5 / 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 10,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 1 },
  },
  chosenLove: {
    tintColor: color.WHITE
  },
  chosenLoveContainer: {
    backgroundColor: color.HEART
  },
  chosenBookmarkContainer: {
    backgroundColor: color.BOOKMARK
  }
})