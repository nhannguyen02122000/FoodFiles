import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import TabNavigation from './tabNavigation';
import IngredientDetail from '../ingredientDetail/index'
import ArticleDetail from '../explore/articleDetail'
import Search from '../search/index'
import ForgotForm from '../auth/forgotForm'
import Favorite from '../favorites/index'

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
    name: 'main',
    component: TabNavigation,
  },
  {
    headerLeft: headerLeftComponent,
    name: 'ingredientDetail',
    component: IngredientDetail,
  },
  {
    headerLeft: headerLeftComponent,
    name: 'searchIngre',
    component: Search
  },
  {
    headerLeft: headerLeftComponent,
    name: 'articleDetail',
    component: ArticleDetail
  },
  {
    headerLeft: headerLeftComponent,
    name: 'forgotForm',
    component: ForgotForm
  },
  {
    headerLeft: headerLeftComponent,
    name: 'favorite',
    component: Favorite
  }
]

export default StackNavigationData;
