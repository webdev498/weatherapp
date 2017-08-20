import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, ListView, Image, Animated, Vibration, Easing, TouchableOpacity} from 'react-native';
import Slider from "react-native-slider";
import { EvilIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  runZone: {
    flex: 1,
    backgroundColor: "#fff"
  },
  button: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  back: {
    fontSize: 21,
    lineHeight: 18,
  },
  buttonText: {
    fontSize: 16
  },
  title: {
    fontSize: 28,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'source-sans-regular',
    marginTop: 40
  },
  hose: {
    marginTop: 120,
    alignItems: 'center'
  },
  topHose: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderLeftColor: '#000',
    borderRightColor: '#000',
    borderTopColor: '#000',
    borderBottomColor: '#fff',
    width: 70,
    height: 50,
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
    overflow: 'hidden',
  },
  insideTopHose: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftColor: 'transparent',
    borderRightColor: '#000',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    width: 50,
    height: '100%',
  },
  bottomHose: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#000',
    width: '90%',
    height: 70,
    marginTop: 48,
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  insideBottomHose: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopColor: '#000',
    borderBottomColor: '#000',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    width: '100%',
    marginTop: 8,
    height: 50,
  },
  opening: {
    backgroundColor: '#000',
    width: 100,
    height: 10,
    position: 'absolute',
    top: -10
  },
  progressBar: {
    marginTop: 50,
    marginBottom: 50,
    height: 5,
    width: '90%'
  },
  progressBarText: {
    fontSize: 28
  },
  buttonArea: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  timerButton: {
    paddingBottom: 30
  },
  timerButtonText: {
    fontSize: 16,
    fontFamily: 'source-sans-regular',
  },
  spout: {
    position: 'absolute',
    width: 150,
    top: 130,
    height: 100,
    left: '50%',
    marginLeft: -75,
  },
  sprinkle: {
    resizeMode: 'contain',
    height: 40,
    width: 'auto'
  },
  water: {
    position: 'absolute',
    left: 0,
    bottom: -135,
    height: 100,
    width: '100%',
    backgroundColor: '#393a35',
    zIndex: -1
  },
  water2: {
    position: 'absolute',
    left: 0,
    bottom:  -58,
    height: 50,
    width: '100%',
    backgroundColor: '#393a35',
    zIndex: -1
  },
  wave: {
    resizeMode: 'contain',
    width: '100%',
    left: 0,
    position: 'absolute',
    top: -35
  },
  wave2: {
    resizeMode: 'contain',
    width: '100%',
    left: 0,
    position: 'absolute',
    top: -25
  },
});

const MenuButtons = props => {
  const {stop, start} = props;
  return (
    <View style={styles.buttonArea}>
      <TouchableOpacity style={styles.timerButton} onPress={stop}>
        <Text style={styles.timerButtonText}>Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.timerButton} onPress={start}>
        <Text style={styles.timerButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  )
};

let drop1;
let drop2;
let water;
const timer = require('react-native-timer');

export default class Zones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
      time: '0:00',
      drop1Anim: new Animated.Value(0),
      drop2Anim: new Animated.Value(0),
      waterAnim: new Animated.Value(0),
      water2Anim: new Animated.Value(0)
    };
  }

  updateValue = (minute) => {
    this.setState({timer: minute, time: minute + ':00'})
  }

  stopTimer = () => {
    timer.clearInterval(this);
    this.setState({timer: 0, time: '0:00'})
    this.state.waterAnim.setValue(0)  
    this.state.water2Anim.setValue(0)  
    alert('Timer Complete')   
  }

  goBack = () => {
    console.log(this.props.navigation)
    this.props.navigation.navigate('Dail')
  }

  start = () => {
    Animated.timing( // Animate over time
      this.state.waterAnim, // Where the animation is current
      {
        toValue: 1, // What I'm animating to
        easing: Easing.sin,
        duration: 1000
      }
    ).start(()=>{
      timer.setInterval(this, 'runZoneTimer', () => {
          this.startTimer();
          //Vibration.vibrate();
      }, 1000);
    });  
    Animated.timing( // Animate over time
      this.state.water2Anim, // Where the animation is current
      {
        toValue: 1, // What I'm animating to
        easing: Easing.sin,
        duration: 500,
        delay: 800,
      }
    ).start();  
  }


  startTimer = () => {
    const {time} = this.state;
    var timeArray = time.split(':');
    var m = parseInt(timeArray[0]);
    var s = this.checkSecond((parseInt(timeArray[1]) - 1));

    this.state.drop1Anim.setValue(0)  
    this.state.drop2Anim.setValue(0)  

    Animated.timing( // Animate over time
      this.state.drop1Anim, // Where the animation is current
      {
        toValue: 2, // What I'm animating to
        easing: Easing.sin,
        duration: 500
      }
    ).start();  

    Animated.timing( // Animate over time
      this.state.drop2Anim, // Where the animation is current
      {
        toValue: 2, // What I'm animating to
        easing: Easing.sin,
        delay: 500,
        duration: 500
      }
    ).start();  

      if(s==59){m=m-1}
      
      if(m<0){
        this.stopTimer();
      }else{
        this.setState({time: m+ ':' + s})
      }
  }

  checkSecond = (sec) => {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
  }

  componentWillMount () {
    drop1 = this.state.drop1Anim.interpolate({
      inputRange: [0,1,2],
      outputRange: [0,1,0] 
    }) 
    drop2 = this.state.drop2Anim.interpolate({
      inputRange: [0,1,2],
      outputRange: [0,1,0] 
    }) 
    water = this.state.waterAnim.interpolate({
      inputRange: [0,1],
      outputRange: [0,-102] 
    }) 
    water2 = this.state.water2Anim.interpolate({
      inputRange: [0,1],
      outputRange: [0,-55] 
    }) 
  }

  componentWillUnmount() {
    timer.clearTimeout(this);
  }


  render() {
    return (
        <View style={styles.runZone}>
          <TouchableOpacity style={styles.button} onPress={this.goBack}>
            <EvilIcons name="chevron-left" style={styles.back} />
            <Text style={styles.buttonText}>Zone Options</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Run Zone</Text>
          <View style={styles.spout}>
            <Animated.View style={{opacity:drop2}}>
            <Image source={require('../public/assets/images/top-sprinkle.png')} style={styles.sprinkle} />
            </Animated.View>
            <Animated.View style={{opacity:drop1}}>
              <Image source={require('../public/assets/images/bottom-sprinkle.png')} style={styles.sprinkle} />
            </Animated.View>
          </View>
          <View style={styles.hose}>
            <View style={styles.topHose}>
              <Animated.View style={[styles.water2,{transform: [{translateY: water2}]}]}>
                <Image source={require('../public/assets/images/back-wave.png')} style={styles.wave2} />
              </Animated.View>
              <View style={styles.opening}></View>
              <View style={styles.insideTopHose}></View>
            </View>
            <View style={styles.bottomHose}>
              <View style={styles.insideBottomHose}></View>
              <Animated.View style={[styles.water,{transform: [{translateY: water}]}]}>
                <Image source={require('../public/assets/images/back-wave.png')} style={styles.wave} />
              </Animated.View>
            </View>
            <Slider
              style={styles.progressBar}
              step={1}
              minimumValue={0}
              maximumValue={168}
              value={this.state.timer}
              onValueChange={val => this.updateValue(val)}
              onSlidingComplete={ val => this.updateValue(val)}
              />
            <Text style={styles.progressBarText}>{this.state.timer} Minutes</Text>
            <Text>{this.state.time} Left</Text>
          </View>
          <MenuButtons start={this.start} stop={this.stopTimer}/>
        </View>
    );
  }
}



