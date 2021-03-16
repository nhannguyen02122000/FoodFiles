import React from 'react'
import Home from '../home/index';
import * as language from '../../constants/language'
const iconHome = require('../../../assets/tabbar/home.png');
const iconExplore = require('../../../assets/tabbar/explore.png');
const iconTracking = require('../../../assets/tabbar/tracking.png');
const iconList = require('../../../assets/tabbar/list.png');

const tabNavigationData = [
  {
    name: language.BOTTOM_NAV_BAR_HOME,
    component: Home,
    icon: iconHome,
  },
  {
    name: language.BOTTOM_NAV_BAR_EXPLORE,
    component: Home,
    icon: iconExplore

  },
  {
    name: language.BOTTOM_NAV_BAR_TRACKING,
    component: Home,
    icon: iconTracking
  },
  {
    name: language.BOTTOM_NAV_BAR_LIST,
    component: Home,
    icon: iconList
  },
];

export default tabNavigationData;