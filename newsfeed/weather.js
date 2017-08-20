import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  section: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    position: 'relative'
  },
  temp: {
      position: 'absolute',
      fontSize: 70,
      fontWeight: '700',
      right: 10,
      top: -10,
      zIndex: 1,
      fontFamily: 'source-sans-bold',
      color: '#2f3436',
      backgroundColor: 'transparent'
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 130,
    fontSize: 100,
    zIndex: 1,
    color: '#2f3436',
    backgroundColor: 'transparent'
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  weather: {
    height: 161,
    width: '100%'
  },
  forcastStatus: {
    marginTop: 100
  },
  location: {
    fontSize: 14,
    fontFamily: 'source-sans-regular',
    color: '#2f3436'
  },
  status: {
    fontFamily: 'source-sans-bold',
    fontSize: 15,
    color: '#2f3436'
  }
});

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.section,styles.weather]}>
        <MaterialCommunityIcons name="weather-lightning-rainy" style={styles.icon} />
        <Text style={styles.temp}>81°</Text>
        <View style={styles.forcastStatus}>
          <Text style={styles.location}>Dallas, TX</Text>
          <Text style={styles.status}>Partly Cloudy with Showers</Text>
        </View>
      </View>
    );
  }
}



