import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native"
import {
  Button
} from 'react-native-elements'
import { useSelector } from 'react-redux'
import { HOME } from '../../constants/language'
import { color } from '../../constants/color'
import LinearGradient from 'react-native-linear-gradient'
import { normalize } from '../../constants/size'
import { qoutesRef } from '../../store/query'

const { width, height } = Dimensions.get('screen')
const Home = ({ navigation }) => {
  const { user } = useSelector(state => state.user)
  const [qoute, setQoute] = useState('')
  useEffect(() => {
    qoutesRef.get().then(doc => {
      const qoutesLst = doc.data().qoutesLst
      const randomInd = Math.floor(Math.random() * qoutesLst.length)
      setQoute(qoutesLst[randomInd])
    })
  }, [])
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['rgba(255, 197, 41, 0.8)', '#F27E4C']}
        style={styles.header}
      >
        <Text
          style={styles.headerText}
        >
          {HOME.HELLO + ",\n" + (user.fullname ? user.fullname : HOME.ANONYMOUS)}
        </Text>
        <Text
          style={styles.subtitleHeader}
        >
          {HOME.SUBTITLEHEADER}
        </Text>
      </LinearGradient >
      <TouchableOpacity style={styles.searchOpa}>
        <Button
          icon={
            <Image
              source={require('../../../assets/home/search.png')}
            />
          }
          title={HOME.FIND}
          buttonStyle={styles.searchBtn}
          titleStyle={styles.titleBtn}
          onPress={() => navigation.navigate('searchIngre')}
        />
      </TouchableOpacity>
      <View style={styles.foodfact}>
        <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../../assets/home/foodfact.png')}
          />
          <Text style={styles.foodTitle}>{HOME.FOODFACTTITLE}</Text>
        </View>
        <Text style={styles.qouteContent}>{qoute}</Text>
      </View>
    </View>
  )
}
export default Home
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: color.BACKGROUND,
    height: "100%",
    width: "100%",
  },
  header: {
    height: height / 2,
    alignItems: 'center',
    width: "100%",
    elevation: 0
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'OpenSans',
    fontSize: normalize(30),
    color: color.WHITE,
    paddingTop: normalize(50),
    fontWeight: '600',
  },
  subtitleHeader: {
    maxWidth: '70%',
    textAlign: 'center',
    color: color.WHITE,
    fontFamily: 'OpenSans',
    fontSize: normalize(15),
    fontWeight: '600',
    marginTop: normalize(16)
  },
  searchOpa: {
    width: "80%",
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 4,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 1 },
    marginTop: -normalize(20)
  },
  searchBtn: {
    backgroundColor: color.WHITE,
    justifyContent: 'flex-start',
    paddingLeft: normalize(20),
    height: normalize(40)
  },
  titleBtn: {
    color: color.PRIMARY,
    paddingLeft: normalize(15),
    fontFamily: "OpenSans",
    fontSize: normalize(12),
  },
  foodfact: {
    width: "80%",
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 4,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    marginTop: normalize(20),
    padding: normalize(20),
    backgroundColor: color.WHITE
  },
  foodTitle: {
    paddingLeft: normalize(15),
    fontFamily: "OpenSans",
    fontSize: normalize(12),
    color: color.PRIMARY
  },
  qouteContent: {
    fontFamily: "OpenSans",
    fontSize: normalize(12),
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: 35
  }
})