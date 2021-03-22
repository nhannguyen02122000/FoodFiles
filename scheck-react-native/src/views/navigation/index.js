import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import RootNavigation from './rootNavigation';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ImageBackground
} from 'react-native'
import {
  Divider
} from 'react-native-elements'
import { normalize } from '../../constants/size'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import * as authAction from '../../store/reducer/userReducer'

const iconHome = require('../../../assets/tabbar/home.png')
const iconExplore = require('../../../assets/tabbar/explore.png')
const iconTracking = require('../../../assets/tabbar/tracking.png')
const iconList = require('../../../assets/tabbar/list.png')
const iconLove = require('../../../assets/explore/loveFulfill.png')
const iconBookmark = require('../../../assets/explore/bookmarkFulfill.png')
const iconUser = require('../../../assets/sidebar/user.png')
const iconLogout = require('../../../assets/sidebar/logout.png')

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: normalize(150)
  },
  menuLabelFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuTitle: {
    fontFamily: "OpenSans",
    fontSize: normalize(14),
    paddingLeft: normalize(20),
    color: 'rgba(0, 0, 0, 0.4)'
  },
  collection: {
    fontSize: normalize(14),
    fontFamily: "Quicksand",
    color: 'rgba(0, 0, 0, 0.4)',
    padding: normalize(10)
  }
})
const Drawer = createDrawerNavigator();
const drawerData = [
  {
    name: 'Home',
    icon: iconHome,
  },
  {
    name: 'Explore',
    icon: iconExplore,
  },
  {
    name: 'Tracking',
    icon: iconTracking,
  },
  {
    name: 'List',
    icon: iconList,
  },
];
const CustomDrawerContent = (props) => {
  const dispatch = useDispatch()
  const signoutHandler = () => {
    auth().signOut().then(() => {
      dispatch(authAction.signout())
      props.navigation.closeDrawer()
    })
  }
  return (
    <DrawerContentScrollView {...props} style={{ padding: 0, marginTop: -10 }}>
      <ImageBackground
        source={require('../../../assets/sidebar/background.png')}
        style={styles.bg}
      >

      </ImageBackground>
      <View style={styles.divider} />
      {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx + 1}`}
          label={() => (
            <View
              style={styles.menuLabelFlex}>
              <Image
                style={{ width: normalize(22), height: normalize(22) }}
                source={item.icon}
              />
              <Text style={styles.menuTitle}>{item.name}</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate(item.name)}
        />
      ))}
      <Divider />
      <Text style={styles.collection}>COLLECTION</Text>
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: normalize(22), height: normalize(22), tintColor: 'rgba(0, 0, 0, 0.4)' }}
              source={iconLove}
            />
            <Text style={styles.menuTitle}>Favorites</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('favorite')}
      />
      <View style={styles.divider} />
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: normalize(22), height: normalize(22), tintColor: 'rgba(0, 0, 0, 0.4)' }}
              source={iconBookmark}
            />
            <Text style={styles.menuTitle}>Bookmarks</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('Bookmark')}
      />
      <Divider />
      <Text style={styles.collection}>USER</Text>
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: normalize(22), height: normalize(22), tintColor: 'rgba(0, 0, 0, 0.4)' }}
              source={iconUser}
            />
            <Text style={styles.menuTitle}>Profile</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('Bookmark')}
      />
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: normalize(22), height: normalize(22), tintColor: 'rgba(0, 0, 0, 0.4)' }}
              source={iconLogout}
            />
            <Text style={styles.menuTitle}>Sign out</Text>
          </View>
        )}
        onPress={signoutHandler}
      />
    </DrawerContentScrollView>
  );
}

export default App = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        //backgroundColor: theme.BACKGROUND_COLOR,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Homes" component={RootNavigation} />
    </Drawer.Navigator>
  );
}
