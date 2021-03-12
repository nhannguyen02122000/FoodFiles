import React from 'react'
import Home from '../home/index';
import * as language from '../../constants/language'
const iconHome = require('../../../assets/tabbar/home.png');
const iconHistory = require('../../../assets/tabbar/history.png');
const iconArticle = require('../../../assets/tabbar/article.png');
const iconMore = require('../../../assets/tabbar/more.png');

const tabNavigationData = [
  {
    name: language.BOTTOM_NAV_BAR_HOME,
    component: Home,
    icon: iconHome,
  },
  {
    name: language.BOTTOM_NAV_BAR_HISTORY,
    component: Home,
    icon: iconHistory
  },
  {
    name: language.BOTTOM_NAV_BAR_ARTICLE,
    component: Home,
    icon: iconArticle
  },
  {
    name: language.BOTTOM_NAV_BAR_MORE,
    component: Home,
    icon: iconMore
  },
];

export default tabNavigationData;