import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, StatusBar, Navigator, TouchableOpacity,Vibration, Animated, Easing, Dimensions,} from 'react-native';
import { Stack } from '../config/router';
import { Dial } from './dial'
import ReactNativeHaptic from 'react-native-haptic';
import menu from '../services/data/menu.json';

const styles = StyleSheet.create({
  dialStyle: {

  },
  dialContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  menu: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  dial: {
    position: 'absolute',
    width: 340,
    height: 340,
    top: 120,
    left: '50%',
    transform: [{translateX: -170}],
    elevation: 1,
    backgroundColor: 'transparent',
    /* For Testing Purposes */
    /*
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    */
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  button: {
    paddingBottom: 30
  },
  menuItem: {
    alignItems: 'center',
    width: '33.3%',
    paddingTop: 35,
    height: 15,
    position: 'relative'
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'source-sans-regular',
  },
  active: {
    fontFamily: 'source-sans-regular',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },
  arrowDown: {
    width: 10,
    marginTop: 4,
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: '#000',
    opacity: 0,
  },
  arrowActive: {
    opacity: 1
  }
});

const TopMenu = props => {
  const {menu, topMenuIndex} = props;
  return (
    <View style={styles.menu}>
      {menu.map((menuLink, i) => (
        <View key={i} style={styles.menuItem}>
          <Text style={styles.active}>{menuLink}</Text>
          <View style={[styles.arrowDown,topMenuIndex === i ? styles.arrowActive : null]}></View>
        </View>
      ))}
    </View>
)};

const MenuButtons = props => {
  const {prev, next} = props;
  return (
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={prev}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={next}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  )
};

export default class DialContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topMenu: ['Zones','Zone','Zone Options'], // top menu data
      topMenuIndex: 0, // top menu index
      dialMenu: menu[0].zones, // dial menu data,
      dialDiameter: 340, // dial width
  };
}

//To Do: Make into one call next/prev

  nextMenu = () => {
    let {topMenu, topMenuIndex} = this.state;

    //add 1 to section index
    topMenuIndex++
    //only go to the next slide, if it exist
    if(topMenu[topMenuIndex]){
      this.dial.resetDial(menu[topMenuIndex][topMenu[0].toLowerCase()]);
      this.setState({topMenuIndex: topMenuIndex});
    }
  }

  prevMenu = () => {
    let {topMenu, topMenuIndex} = this.state;
    //subtract 1 to section index
    topMenuIndex--
    //only go to the prev slide, if it exist    
    if(topMenu[topMenuIndex]){
      this.dial.resetDial(menu[topMenuIndex][topMenu[0].toLowerCase()]);
      this.setState({topMenuIndex: topMenuIndex});
    }else{
      this.props.navigation.navigate('Sites')
    }
  }


  //TO DO: explain this function

  handleChange(a){
    //console.log(a);
  }

  //TO DO: replace with next function

  updateTopMenu = (options,option) => {
    const {topMenu,topMenuIndex} = this.state;
    topMenu[topMenuIndex] = option;
    this.setState({topMenu: topMenu});
    this.nextMenu();
    if(option === 'Run Zone'){
      this.props.navigation.navigate('RunZone')
    }
  }


  render() {
    const {
      topMenu,
      topMenuIndex,
      dialDiameter,
      dialMenu
    } = this.state;

    return (
      <View style={styles.dialContainer}>
        <TopMenu menu={topMenu} topMenuIndex={topMenuIndex}/>
        <View style={styles.dial}>
          <Dial
            diameter={dialDiameter}
            menu={dialMenu}
            dialStyle={styles.dialStyle}
            ref={(input) => { this.dial = input; }}
            onMenuClick={this.updateTopMenu}
            onAngleChange={(a) => this.handleChange(a)}
            startingAngle="0" />
        </View>
        <MenuButtons next={this.nextMenu} prev={this.prevMenu}/>
      </View>
    );
  }

}
