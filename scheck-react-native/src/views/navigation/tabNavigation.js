import * as React from 'react';
import { Text, View, Image, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { color } from "../../constants/color"
import tabNavData from './tabNavData';

const Tab = createBottomTabNavigator();

export default BottomTabs = () => {
  return (
    <Tab.Navigator tabBarOptions={{ style: { height: Platform.OS === 'ios' ? 90 : 70 } }}>
      {tabNavData.map((item, idx) => (
        <Tab.Screen
          key={`tabItem${idx}`}
          name={item.name}
          component={item.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                <Image
                  resizeMode="contain"
                  source={item.icon}
                  style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
                />
              </View>
            ),
            tabBarLabel: ({ focused }) =>
              <Text
                style={{ fontSize: 12, color: focused ? color.PRIMARY : color.GRAY }}
              >
                {item.name}
              </Text>,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    bottom: Platform.OS === 'ios' ? -5 : 0,
  },
  tabBarIcon: {
    width: 25,
    height: 25,
  },
  tabBarIconFocused: {
    tintColor: color.PRIMARY,
  },
});
