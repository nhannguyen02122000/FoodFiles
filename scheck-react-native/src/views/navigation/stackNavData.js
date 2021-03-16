import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import TabNavigation from './tabNavigation';

const StackNavigationData = [
  {
    name: 'SCheck',
    component: TabNavigation,
    headerLeft: null,
    headerTitleStyle: {
      color: 'red',
      fontSize: 18,
    },
  },
]

export default StackNavigationData;
