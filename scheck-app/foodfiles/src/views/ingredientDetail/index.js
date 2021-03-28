import React, { useEffect, useState } from 'react'
import storage from '@react-native-firebase/storage'
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import { Divider, Button } from 'react-native-elements'
import { INGDETAIL } from '../../constants/language'
import { normalize } from '../../constants/size'
import { color } from '../../constants/color'
import { ingredientRef } from '../../store/query'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Snackbar } from 'react-native-paper'

const { width, height } = Dimensions.get('screen')
const styles = StyleSheet.create({
  profileContainer: {
    width: width,
    height: height / 3
  },
  ingName: {
    fontFamily: "OpenSans",
    fontSize: normalize(30)
  },
  bodyContent: {
    padding: normalize(16),
    backgroundColor: color.WHITE
  },
  toxicityLevel: {

    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    color: color.WHITE,
    width: normalize(128),
    borderRadius: normalize(16),
    textAlign: 'center',
    marginVertical: normalize(8),
    fontWeight: 'bold',
    fontSize: normalize(12)
  },
  safeLevel: {
    backgroundColor: color.SAFE,
  },
  suspiciousLevel: {
    backgroundColor: color.SUSPICIOUS
  },
  dangerousLevel: {
    backgroundColor: color.DANGEROUS
  },
  title: {
    fontFamily: "OpenSans",
    fontSize: normalize(14),
    color: color.BLACK
  },
  detail: {
    fontFamily: "OpenSans",
    fontSize: normalize(14),
    color: 'rgba(0, 0, 0, 0.6)'
  },
  firstRow: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    marginTop: normalize(24)
  },
  diverder: {
    marginVertical: normalize(15)
  },
  foundin: {
    flexDirection: 'row'
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
  chosenBookmarkContainer: {
    backgroundColor: color.BOOKMARK
  },
  iconBookmark: {
    width: "100%",
    height: "100%",
    tintColor: color.BOOKMARK
  },
  chosenLove: {
    tintColor: color.WHITE
  }
})
const IngredientDetail = (props) => {
  const [visible, setVisible] = useState(false)
  const [mess, setMess] = useState('')
  const [additive, setAdditive] = useState([])
  const [ingInfo, setIngInfo] = useState({})
  const ingLst = useSelector(state => state.ingredients.ingredients)
  useEffect(() => {
    const getData = async () => {
      let data = null
      if (ingLst.length === 0) {
        const response = await ingredientRef.doc(props.route.params.ingId).get()
        data = response.data()
      }
      else {
        for (const item of ingLst) {
          if (item.id === props.route.params.ingId) {
            data = item
            break
          }
        }
      }
      let url = null
      if (data.imageUrl !== '') url = await storage().ref(data.imageUrl).getDownloadURL()
      data.url = url
      setIngInfo(data)
    }
    const getLocalData = async () => {
      try {
        const value = await AsyncStorage.getItem('additive')
        if (value !== null) {
          setAdditive(JSON.parse(value))
        }
      } catch (er) {
        console.log(er)
      }
    }
    getLocalData()
    getData()
  }, [])
  const reactHandler = (item) => {
    setAdditive(cur => {
      if (cur.filter(ele => ele.id === item.id).length > 0) {
        let newAr = cur.filter(ele => ele.id !== item.id)

        return newAr
      }
      else {
        return [].concat(cur, [item])
      }
    })
  }
  useEffect(() => {
    AsyncStorage.setItem('additive', JSON.stringify(additive))
  }, [additive])
  let styleToxic = styles.toxicityLevel

  if (ingInfo.toxicityLevel) {
    if (ingInfo.toxicityLevel.toUpperCase() === 'SAFE') styleToxic = { ...styles.toxicityLevel, ...styles.safeLevel }
    if (ingInfo.toxicityLevel.toUpperCase() === 'SUSPICIOUS') styleToxic = { ...styles.toxicityLevel, ...styles.suspiciousLevel }
    if (ingInfo.toxicityLevel.toUpperCase() === 'DANGEROUS') styleToxic = { ...styles.toxicityLevel, ...styles.dangerousLevel }
  }
  const icon = {
    Snacks: require('../../../assets/ingredient/snack.png'),
    "Soft drinks": require('../../../assets/ingredient/softdrink.png'),
    "Fruit juices": require('../../../assets/ingredient/juice.png'),
    Milks: require('../../../assets/ingredient/milk.png'),
    "Canned foods": require('../../../assets/ingredient/canfood.png'),
  }

  return (
    <ScrollView style={{ width: "100%", height: "100%", backgroundColor: color.WHITE }}>
      <View>
        <ImageBackground
          //source={require('../../../assets/defaultIngDetail.png')}
          source={ingInfo.url ? { uri: ingInfo.url } : require('../../../assets/defaultIngDetail.png')}
          style={styles.profileContainer}
        />
        <TouchableOpacity
          style={additive &&
            additive.filter(ele => ele.id === props.route.params.ingId).length > 0 ?
            { ...styles.iconcontainerBookmark, ...styles.chosenBookmarkContainer } : styles.iconcontainerBookmark}
          onPress={() => {
            reactHandler({ id: ingInfo.id, name: ingInfo.name })
            setMess(additive.filter(ele => ele.id === props.route.params.ingId).length > 0 ?
              INGDETAIL.REMOVEBOOKMARK : INGDETAIL.ADDBOOKMARK)
            setVisible(true)
          }}
        >
          <Image
            source={require('../../../assets/explore/bookmarkFulfill.png')}
            style={additive &&
              additive.filter(ele => ele.id === props.route.params.ingId).length > 0 ?
              { ...styles.iconBookmark, ...styles.chosenLove } : styles.iconBookmark}
          />
        </TouchableOpacity>
        <View style={styles.bodyContent}>
          <Text style={styles.ingName}>{ingInfo.name}</Text>
          <Text style={styleToxic}>{ingInfo.toxicityLevel ? ingInfo.toxicityLevel.toUpperCase() : ''}</Text>
          <View style={styles.firstRow}>
            <View>
              <Text style={styles.title}>{INGDETAIL.ENUM}</Text>
              <Text style={styles.detail}>{ingInfo.eNumber}</Text>
            </View>
            <View>
              <Text style={styles.title}>{INGDETAIL.ADI}</Text>
              <Text style={styles.detail}>{ingInfo.ADI}</Text>
            </View>
          </View>
          <Divider style={styles.diverder} />
          <View>
            <Text style={styles.title}>{INGDETAIL.ROLE}</Text>
            <Text style={styles.detail}>{ingInfo.role}</Text>
            <Text style={{ ...styles.title, marginTop: normalize(15) }}>{INGDETAIL.FOUNDIN}</Text>
            <ScrollView style={styles.foundin} horizontal>
              {ingInfo.foundIn ? ingInfo.foundIn.map((ele, ind) => (
                <Button
                  key={ind}
                  icon={icon[ele] ? <Image
                    source={icon[ele]}
                    style={{ width: 25, height: 25 }}
                  /> : null}
                  type='clear'
                  title={ele}
                  titleStyle={styles.detail}
                />
              )) : null}
            </ScrollView>
          </View>
          <Divider style={styles.diverder} />
          <View>
            <Text style={styles.title}>{INGDETAIL.DES}</Text>
            <Text style={styles.detail}>{ingInfo.description}</Text>
          </View>
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
          }}
        >
          <Text style={{ color: 'black' }}>{mess}</Text>
        </Snackbar>
      </View>
    </ScrollView>
  )
}
export default IngredientDetail
