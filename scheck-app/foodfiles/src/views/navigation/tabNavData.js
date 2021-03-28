import React from 'react'
import Home from '../home/index';
import Tracking from '../tracking/index'
import List from '../list/index'
import ArticleList from '../explore/articleList'
import * as language from '../../constants/language'
const iconHome = require('../../../assets/tabbar/home.png');
const iconExplore = require('../../../assets/tabbar/explore.png');
const iconTracking = require('../../../assets/tabbar/tracking.png');
const iconList = require('../../../assets/tabbar/list.png');
const iconHomeChosen = require('../../../assets/sidebar/home.png');
const iconExploreChosen = require('../../../assets/sidebar/explore.png');
const iconTrackingChosen = require('../../../assets/sidebar/tracking.png');
const iconListChosen = require('../../../assets/sidebar/list.png');

const tabNavigationData = [
  {
    name: language.BOTTOM_NAV_BAR_HOME,
    component: Home,
    icon: iconHome,
    chosenIcon: iconHomeChosen
  },
  {
    name: language.BOTTOM_NAV_BAR_EXPLORE,
    component: ArticleList,
    icon: iconExplore,
    chosenIcon: iconExploreChosen
  },
  {
    name: language.BOTTOM_NAV_BAR_TRACKING,
    component: Tracking,
    icon: iconTracking,
    chosenIcon: iconTrackingChosen
  },
  {
    name: language.BOTTOM_NAV_BAR_LIST,
    component: List,
    icon: iconList,
    chosenIcon: iconListChosen
  },
];

export default tabNavigationData;