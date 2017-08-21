import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, StatusBar, Navigator } from 'react-native';
import { SideMenu, SitesMenu } from './config/router';
import Header from './shared/header';
import { NavigationActions } from 'react-navigation';
import {Font} from 'expo';


const styles = StyleSheet.create({
  container: {
    paddingBottom: 60
  },
  body: {
    flex: 1
  },
  header: {
    height: 60,
    borderStyle: 'solid',
    borderBottomColor: '#ccc', 
    borderBottomWidth: 1,
  },
  contentContainer: {
    paddingVertical: 60
  }
});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'source-sans-regular': require('./public/assets/fonts/SourceSansPro-Regular.ttf'),
      'source-sans-bold': require('./public/assets/fonts/SourceSansPro-Bold.ttf'),
      'source-sans-black': require('./public/assets/fonts/SourceSansPro-Black.ttf')
    });

    this.setState({fontLoaded: true});
  }

  openNav = () => {
    const {navOpen} = this.state;
    let currentState = navOpen ? 'DrawerClose' : 'DrawerOpen';
    this.navigator._navigation.navigate(currentState);
  }

  // gets the current screen from navigation state
  getCurrentRouteName = (navigationState) => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this.getCurrentRouteName(route);
    }
    return route.routeName;
  }


  render() {
    const {fontLoaded} = this.state;
    return (
        <View style={styles.body}>
          {fontLoaded ? (
            <Header openNav={this.openNav} />
            ) : null
          }
          {fontLoaded ? (
            <SideMenu ref={nav => { this.navigator = nav; }} onNavigationStateChange={(prevState, currentState) => {
              const currentScreen = this.getCurrentRouteName(currentState);
              const prevScreen = this.getCurrentRouteName(prevState);

              if(prevScreen !== currentScreen) {
                this.setState({navOpen: currentScreen === 'DrawerOpen'})
              }
            }} />
            ) : null
          }
        </View>
    );
  }
}