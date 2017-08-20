

import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, StatusBar, Navigator } from 'react-native';
import {StackNavigator,DrawerNavigator,DrawerItems} from 'react-navigation';
import NewsFeed from '../newsfeed/index';
import Sites from '../sites/index';
import DialContainer from '../dial/index';
import Zones from '../zones/index';


const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  section: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    position: 'relative'
  }
});

const CustomDrawerContentComponent = (props) => (
  <View style={styles.container}>
    <DrawerItems {...props} activeTintColor='#e91e63' inactiveTintColor='#000' activeBackgroundColor='rgba(0, 0, 0, 0)' inactiveBackgroundColor='transparent' style={{backgroundColor: '#fff'}}/>
  </View>
);

export const DialMenu = StackNavigator({
  Dail: {
    screen: DialContainer
  },
  RunZone: {
    screen: Zones
  }
},
{
  headerMode: 'none'
});


// Sites Menu
export const SitesMenu = StackNavigator({
  Sites: {
    screen: Sites
  },  
  DialMenu: {
    screen: DialMenu
  }
},
{
  headerMode: 'none'
});


//Side Menu
export const SideMenu = DrawerNavigator({
  NewsFeed: {
    screen: NewsFeed,
    navigationOptions: {
      drawerLabel: 'NewsFeed',
      drawerLockMode: 'locked-closed'
    }
  },
  Stack: {
    screen: SitesMenu,
    navigationOptions: {
      drawerLabel: 'Sites',
      drawerLockMode: 'locked-closed'
    }
  }
},{
  contentComponent: CustomDrawerContentComponent,
});


