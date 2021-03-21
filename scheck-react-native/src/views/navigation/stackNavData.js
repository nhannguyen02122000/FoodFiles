import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import TabNavigation from './tabNavigation';
import IngredientDetail from '../ingredientDetail/index'
import { color } from '../../constants/color'

const headerLeftComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Image
        source={require('../../../assets/arrow_back.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>
  )
}
const StackNavigationData = [
  {
    headerLeft: null,
    name: ' ',
    component: TabNavigation,
  },
  {
    headerLeft: headerLeftComponent,
    name: 'ingredientDetail',
    component: IngredientDetail,
  },
]

export default StackNavigationData;
