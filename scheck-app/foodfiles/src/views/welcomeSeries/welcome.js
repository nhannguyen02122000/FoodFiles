import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { color } from '../../constants/color'
import { normalize } from '../../constants/size'
import { WALKTHROUGH } from '../../constants/language'
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.BACKGROUND
  },
  buttonCircle: {
    width: normalize(200),
    height: normalize(200),
    marginVertical: normalize(50),
    borderRadius: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: normalize(20),
    marginBottom: normalize(20),
    fontFamily: "OpenSans",
    color: "#343434",
    maxWidth: "75%",
    textAlign: 'center'
  },
  btn: {
    borderRadius: 30,
    backgroundColor: 'rgba(255, 197, 41, 0.8)'
  },
  linearGradient: {
    alignItems: 'center',
    borderRadius: 30,
    padding: 15
  },
  text: {
    maxWidth: "80%",
    fontFamily: "Quicksand",
    fontSize: normalize(14),
    color: "#9EA9B1",
    textAlign: 'center'
  }
});
const slides = [
  {
    key: 'one',
    title: WALKTHROUGH.SCREEN1.TITLE,
    text: WALKTHROUGH.SCREEN1.CONTENT,
    image: require('../../../assets/walkthrough/walkthrough1.png'),
    backgroundColor: color.WHITE,
  },
  {
    key: 'two',
    title: WALKTHROUGH.SCREEN2.TITLE,
    text: WALKTHROUGH.SCREEN2.CONTENT,
    image: require('../../../assets/walkthrough/walkthrough2.png'),
    backgroundColor: color.WHITE,
  },
  {
    key: 'three',
    title: WALKTHROUGH.SCREEN3.TITLE,
    text: WALKTHROUGH.SCREEN3.CONTENT,
    image: require('../../../assets/walkthrough/walkthrough3.png'),
    backgroundColor: color.WHITE,
  }
];

const Welcome = (props) => {
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.buttonCircle} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  const _renderDoneButton = () => {
    return (
      <LinearGradient
        colors={['#F27E4C', 'rgba(255, 197, 41, 0.8)']}
        useAngle={true}
        angle={270}
        angleCenter={{
          x: 0, y: 0
        }}
        style={styles.linearGradient}
      >
        <Text style={{ color: color.WHITE }}>
          {WALKTHROUGH.GETSTARTED}
        </Text>
      </LinearGradient >
    )
  }
  const _rebderNextButton = () => {
    return (
      <LinearGradient
        colors={['#F27E4C', 'rgba(255, 197, 41, 0.8)']}
        useAngle={true}
        angle={270}
        angleCenter={{
          x: 0, y: 0
        }}
        style={styles.linearGradient}>
        <Text style={{ color: color.WHITE }}>
          {WALKTHROUGH.NEXT}
        </Text>
      </LinearGradient>
    )
  }
  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      onDone={() => props.setWalkthroughScreen(false)}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_rebderNextButton}
      bottomButton
    />
  )
}
export default Welcome