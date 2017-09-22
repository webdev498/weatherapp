import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, StatusBar, Navigator } from 'react-native';
import { SideMenu, SitesMenu } from './config/router';
import Header from './shared/header';
import { NavigationActions } from 'react-navigation';
import I18n from './common/localization';
import { Constants, Location, Permissions, Font } from 'expo';

import { Provider, connect } from 'react-redux'
import store from './store/store.js'
import { locationFetched } from './reducers/locations'

import LoginScreen from './screens/login/login'

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

  async componentWillMount() {
    //Localization
    await I18n.initAsync();
    this.forceUpdate();

    //Geolocation
    this.getLocationAsync();
  }

  async componentDidMount() {
    await Font.loadAsync({
      'source-sans-regular': require('./public/assets/fonts/SourceSansPro-Regular.ttf'),
      'source-sans-bold': require('./public/assets/fonts/SourceSansPro-Bold.ttf'),
      'source-sans-black': require('./public/assets/fonts/SourceSansPro-Black.ttf')
    });

    this.setState({fontLoaded: true});
  }

  getLocationAsync = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });

    let address = await Location.reverseGeocodeAsync({ 
      'latitude': location.coords.latitude, 
      'longitude' : location.coords.longitude
    })

    if (address.length > 0) {
      store.dispatch(locationFetched(address[0]));
    }
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

  getHomeView(props) {
    const {fontLoaded} = this.state;
    
    return (
      <Provider store={store}>
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
      </Provider>
    );

  }


  render() {
    const isLoggedIn = true;
    return (
      <View style={styles.body}>

        { isLoggedIn ? 
          (this.getHomeView())
          : ( <LoginScreen homeView={this}/> )
        }
      </View>
    );
    
  }
}