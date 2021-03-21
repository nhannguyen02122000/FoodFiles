import React, { useEffect, useState } from 'react'
import storage from '@react-native-firebase/storage'
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native'
import { Divider, Button } from 'react-native-elements'
import { INGDETAIL } from '../../constants/language'
import { normalize } from '../../constants/size'
import { color } from '../../constants/color'
import { ingredientRef } from '../../store/query'
import { useSelector } from 'react-redux'

const { width, height } = Dimensions.get('screen')
const styles = StyleSheet.create({
  profileContainer: {
    width: width,
    height: normalize(240)
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
  }
})
const IngredientDetail = (props) => {
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
    getData()
  }, [])
  let styleToxic = styles.toxicityLevel

  if (ingInfo.toxicityLevel) {
    if (ingInfo.toxicityLevel.toUpperCase() === 'SAFE') styleToxic = { ...styles.toxicityLevel, ...styles.safeLevel }
    if (ingInfo.toxicityLevel.toUpperCase() === 'SUSPICIOUS') styleToxic = { ...styles.toxicityLevel, ...styles.suspiciousLevel }
    if (ingInfo.toxicityLevel.toUpperCase() === 'DANGEROUS') styleToxic = { ...styles.toxicityLevel, ...styles.dangerousLevel }
  }
  return (
    <ScrollView>
      <View>
        <ImageBackground
          //source={require('../../../assets/defaultIngDetail.png')}
          source={ingInfo.url ? { uri: ingInfo.url } : require('../../../assets/defaultIngDetail.png')}
          style={styles.profileContainer}
        />
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
                  icon={<Image
                    source={require('../../../assets/itemIngDetail.png')}
                  />}
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
      </View>
    </ScrollView>
  )
}
export default IngredientDetail
