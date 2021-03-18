import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import TabNavigation from './tabNavigation';
import Tracking from '../tracking/index'

const StackNavigationData = [
  {
    headerLeft: null,
    name: ' ',
    component: TabNavigation,
  },
  {
    headerLeft: null,
    name: 'abc',
    component: Tracking,
  },
]

export default StackNavigationData;
