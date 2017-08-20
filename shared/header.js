import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, StatusBar, Navigator, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import {Font} from 'expo';

const styles = StyleSheet.create({
  section: {
    borderStyle: 'solid',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingRight: 20,
    paddingLeft: 20,
    position: 'relative',
    height: 60,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  logo: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 70,
    backgroundColor: 'transparent',
    fontFamily: 'source-sans-regular',
    zIndex: -1
  },
  button: {
    marginTop: 15
  },
  menuButton: {
    fontSize: 42,
    color: 'black',
    backgroundColor: 'transparent'
  }
});

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'source-sans-regular': require('../public/assets/fonts/SourceSansPro-Regular.ttf')    
    });

    this.setState({fontLoaded: true});
  }

  render() {
    const {navState} = this.props;
    const {fontLoaded} = this.state;

    return (
        <View style={styles.section}>
           <StatusBar
             backgroundColor="blue"
             barStyle="default"
           />
           <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={this.props.openNav}>
              <Entypo name="menu" style={styles.menuButton} />
            </TouchableOpacity>
             <View style={styles.button}>
             </View>
             {fontLoaded ? (
              <Text style={styles.logo}>Weathermatic - Concept</Text>
             ) : null
            }
           </View>
        </View>
    );
  }

}
