
import React, { Component } from 'react'
import {Dimensions, PanResponder, StyleSheet, View, Animated, Easing,Text,TouchableOpacity} from 'react-native'
import { throttle } from 'lodash';
import ReactNativeHaptic from 'react-native-haptic';


const degreesPerDialItem = 20;
let maxNumOfRotations = 1;
let scroll;

//Add styling to its on page

const styles = StyleSheet.create({
  coverResponder: {
    padding: 20, // needs a minimum
    position: 'relative'
  },
  innerDialDecorator: {
    top: -25,
    left: 122,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#000',
    elevation: 3
  },
  pointer: {
    top: 20,
    left: 20,
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 5,
  },
  section: {
    borderStyle: 'solid',
  },
  menu: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  dial: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 5,
    borderRadius: 1000,
    elevation: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  menuItem: {
    alignItems: 'center',
    width: '33.3%',
    paddingTop: 35,
    height: 15,
    position: 'relative'
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
  },
  menuOptionItem: {
    fontSize: 35,
    fontFamily: 'source-sans-regular',
    marginLeft: 60,
    marginRight: 60,
    width: 220,
    textAlign: 'center',
    position: 'relative',
    alignItems:'center',
    /* For Testing Purposes */
    /*
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    */
  },
  menuContainer: {
    position: 'absolute',
    top: '50%',
    height: 220,
    marginTop: -90,
    width: 220,
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 1000,
    overflow: 'hidden'
    /* For Testing Purposes */
    /*
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    */
  },
  menuOptions: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    alignItems: 'center',
    top: '50%',
    left: -60,
    height: 220,
    width: 220,
    marginTop: -110
  },
  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  },
  leftArchMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    zIndex: -2
  },
  rightArchMask: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    zIndex: -1,
  },
  touchPath: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderStyle: 'solid',
    borderColor: '#dedede',
    height: '100%',
    width: '100%',
    borderWidth: 50,
    borderRadius: 1000,
    zIndex: -3
  },
  touchPathLoop: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderStyle: 'solid',
    borderColor: '#dedede',
    height: '100%',
    width: '100%',
    borderWidth: 50,
    borderRadius: 1000,
    zIndex: 1,
    opacity: 0.2
  },
  leftArch: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderStyle: 'solid',
    borderColor: 'white',
    height: '100%',
    width: '200%',
    borderWidth: 50,
    borderRadius: 1000,
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'  
  },
  rightArch: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderStyle: 'solid',
    borderColor: 'white',
    height: '100%',
    width: '200%',
    borderWidth: 50,
    borderRadius: 1000,
  },
  trailer: {
    backgroundColor: 'red'
  },
})


// Add to its own page

const TouchPath = props => {
  const {
    rightMaskRotate, 
    leftMaskRotate, 
    leftMaskOpacity, 
    rightMaskColor,
    touchLoops} = props;
  return (
    <View style={styles.touchArea}>
        <View style={styles.touchPath}></View>
        <Animated.View style={[styles.mask,{transform:[{rotate: leftMaskRotate}]}]}>
          <Animated.View style={[styles.leftArchMask,{opacity: leftMaskOpacity}]}>
            <View style={styles.leftArch}></View>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.mask,{transform:[{rotate: rightMaskRotate}]}]}>
          <View style={styles.rightArchMask}>
            <Animated.View style={[styles.rightArch,{borderColor: rightMaskColor}]}></Animated.View>
          </View>
        </Animated.View>
        {touchLoops.map((touch,index)=>(
          <View key={index} style={styles.touchPathLoop}></View>
        ))}
    </View>
  )
};

// Add to its own page

const MenuItem = props => {
  let {
    degreesTraveled, 
    magnifyAnim, 
    fadeAnim, 
    update, 
    onRender,
    option,
    dialMenu,
    leftAttr
  } = props;

  return (
    <TouchableOpacity onPress={()=>{update(dialMenu,option)}}>
      <View style={leftAttr} onLayout={(evt)=>{if(onRender) onRender(evt)}}>
        <Animated.Text style={[{transform: [{scale: magnifyAnim}],opacity: fadeAnim}, styles.menuOptionItem ]}>
          {option}
        </Animated.Text>
      </View>
    </TouchableOpacity>
  )
}

// Add to its own page

const DialMenu = props => {  
  let {
    scrollAnim, 
    currentMenu,
    dialMenu,
    updateMenuState,
    dialDiameter,
    dialIndex,
    rotationIndex,
  } = props;
  //push the first elements to the left, so that we only have to goggle two elements at a time
  let leftAttr = dialIndex * dialDiameter;

  return (
    <View style={[styles.menuContainer]}>
      <Animated.View style={[styles.menuOptions,{transform: [{translateX: scrollAnim}]}]}>
      {currentMenu.map((menuItem,index) => {
        return (
          <View key={index}>
            {index === 0 ? (
              <MenuItem {...props} option={menuItem} leftAttr={{marginLeft: leftAttr}}/>
            ) : (
              <MenuItem {...props} option={menuItem} />
            )}
          </View>
        )
      })}
        <View>
            <MenuItem {...props} option={currentMenu[0]}/>
        </View>
      </Animated.View>
    </View>
  )
}

// Add to its own page

const DialKnob = (props) => (
  <Animated.View style={[styles.dial, {transform: [{rotate: props.rotateAnim}]}, {width: props.diameter - 40, height: props.diameter - 40}]}>
    <View style={styles.innerDialDecorator}>
      <View style={styles.pointer} />
    </View>
  </Animated.View>
)



const { width: screenWidth, height: screenHeight } = Dimensions.get('window')


export class Dial extends Component {
  
  static defaultProps = {
    initialAngle: 0,
    precision: 0,
  }

  constructor (props) {
    super(props)
    //TO DO: change all varialbes to initialAngle    
    this.state = {
      startingAngle: this.props.initialAngle, //where scrolling start
      releaseAngle: this.props.initialAngle, // where scrolling ends
      stopPoint: this.props.initialAngle, //point to snap back to

      //TO DO: same variable. Change that      
      angle: this.props.initialAngle, // current angle
      currentAngle: 0, //current angle





      rotateAnim: new Animated.Value(0), // controls rotate


      xAxis: 0,

      degreesTraveled: 0, // tracks the number of degrees traveled around the circle
      //TO DO: full menu    
      dialMenu: this.props.menu, // dial menu data,
      //TO DO: visible menu  
      currentMenu: [],

      //TO DO: menu index  
      dialIndex: 0, // dial index
      //TO DO: diameter  
      dialDiameter: this.props.diameter, // dial width
      menuMaxScroll: 0, // the furthest left attr for the menu
      breakPoint: 0, // the degrees between each active element
      rotateAnim: new Animated.Value(0), // rotate animation
      scrollAnim: new Animated.Value(0), // scroll animation
      transitionPoints: [0,360], // transition points
      opacityPoints: [0.2,1], // opacity animation
      magnifyPoints: [0,1], // magnify animation
      numOfLoops: 0, //number of rotations
      rotationIndex: 0, //number of rotations relative to the max number of loops. See var maxNumOfRotations
      dialRotationIndex: 1 //the active dial menu item's index
    }

    this.offset = {x: 0, y: 0}
    this.updateState = throttle(this._updateState.bind(this), 16)
  }

  onLayout () {
    this.self.measureInWindow((x, y, width, height) => {
      this.offset = {
        x: ((screenWidth - width) / 2) + width / 2,
        y: y + height / 2,
      }
    })
  }

  updateAngle (gestureState) {
    let {deg, isNegative} = this.calcAngle(gestureState);
    let {angle} = this.state;
    let direction = deg > angle ? "forward" : "backward"; 

    if (Math.abs(deg) > 0) {
      this.updateState(deg, direction)
    }
  }

  calcAngle (gestureState) {
    const {pageX, pageY, moveX, moveY} = gestureState
    const [x, y] = [pageX || moveX, pageY || moveY]
    const [dx, dy] = [x - this.offset.x, y - this.offset.y]
    const {startingAngle, xAxis} = this.state;
    let angle = (Math.atan2(dy, dx) * 180 / Math.PI + 90);
    let deg = (angle < 0) ? angle + 360 : angle;

    return {
      deg: deg,
      isNegative: angle < 0
    }
  }

  updateMenuState = (evt) => {
    const {dialDiameter,dialMenu} = this.state;
    let circleRadius = dialDiameter / 2;
    let {x, y, width, height} = evt.nativeEvent.layout;
  }

  //TO DO: turn into update  

  _updateState (deg, x) {
    let {rotateAnim} = this.state;
    //change snapback degree
    rotateAnim.setValue(deg)
    //set state
    this.setState({angle: deg});
    //pass angle back to parent
    this.props.onAngleChange(deg)
    this.update(deg)
  }

  update = (a) => {
    let {
      dialIndex, 
      numOfLoops, 
      degreesTraveled, 
      currentAngle, 
      dialRotationIndex,
      rotationIndex,
      dialDiameter,
      scrollAnim
    } = this.state;
    
    //split the circle in half. The left side is 1, the right side is 2
    let newDialRotationIndex = (a === 0) ? 1 : Math.ceil(a / 180);
    //detect when we cross 0 degrees. EG index changes from 1 to 2 or vice versa
    let leastToHighestIndex = dialRotationIndex === 1 && newDialRotationIndex === 2;
    let highestToLeastIndex = dialRotationIndex === 2 && newDialRotationIndex === 1;
    //Helps us count above 360 degrees
    let delta = 0;

    //From 2 - 1
    if(highestToLeastIndex && a < 90){
      delta = 360;
    }
    //From 1 - 2
    else if(leastToHighestIndex && a > 270){
      delta = -360;
      //if you're going backwards, start at highest possible degress to travel, 
      //then count down from there.
      if(rotationIndex === 0) {
        degreesTraveled = maxNumOfRotations * 360;
      }
    }
    //number of degrees traveled
    degreesTraveled = delta + ((Math.floor(a) - currentAngle) + degreesTraveled);
    //calculate number of loops
    numOfLoops = degreesTraveled < 0 ? Math.ceil(degreesTraveled / 360) : Math.floor(degreesTraveled / 360);    
    //what loop we're on relative to the max number of loops
    rotationIndex = Math.abs(numOfLoops) >= maxNumOfRotations ? Math.abs(numOfLoops) % maxNumOfRotations : Math.abs(numOfLoops);
    //This angle counts over 360 degrees if needed
    let scrollAngle = (a % 360 === 0) ? (rotationIndex * 360) : (a + (rotationIndex * 360)); 
    //If the menu can be more than 1 loop, count beyond 0 and 360
    this.state.scrollAnim.setValue(scrollAngle); 
    //As we swipe, update rotate and scroll animation with new degrees
    this.state.rotateAnim.setValue(a); 

    //TO DO: don't know if we need anything below 
    //menu scroll left postion
    let scrollLeftAttr = scroll.__getValue()
    //new dial index
    let newDialIndex = Math.ceil(scrollLeftAttr / dialDiameter) * -1;
    
    //console.log('Degrees Traveled: '+degreesTraveled)
    //console.log('Number of Loops: '+numOfLoops)
    //console.log('Dial Rotation Index: '+dialRotationIndex)
    //console.log('Handle Change: ' + scrollAngle)

    this.setState({
      dialIndex: Math.abs(newDialIndex),
      dialRotationIndex: newDialRotationIndex,
      oldRotationIndex: dialRotationIndex, 
      currentAngle: Math.floor(a), 
      numOfLoops: numOfLoops, 
      degreesTraveled: degreesTraveled,
      rotationIndex: rotationIndex
    });

    if(newDialIndex !== dialIndex){
      this.getCurrentMenu('onscroll') 
    }

  }

  getCurrentMenu = (status, newMenu) => {
    let {
      dialDiameter, 
      dialMenu,
      currentMenu
    } = this.state;

    //vibrate everytime the menu changes
    if(ReactNativeHaptic) {
      //Vibration.vibrate();
      ReactNativeHaptic.generate('notification');
    }

    if(status === 'init'){
      //dial menu
      dialMenu = newMenu;
      //calculate max number of rotations we can do with this menu
      this.calculateMaxRotations(dialMenu);
      //now that we have the new menu, calculate dial points
      this.calculateAnimationsPoints(dialMenu);
    }

    //use the current position of the scroller to determine the dial's menu index
    let scrollLeftAttr = scroll ? scroll.__getValue() : 0;
    //set the dial menu index based off of the scroll left attribute
    let dialIndex = Math.abs(Math.ceil(scrollLeftAttr / dialDiameter))
    //if the dial index is more than the menu length, start over. If not, grab the next set of menu items
    currentMenu = dialIndex < (dialMenu.length - 1) ? dialMenu.slice(dialIndex, dialIndex + 2) : [dialMenu[dialMenu.length-1],dialMenu[0]]

    //update menu when a change is detected 
    this.setState({
      currentMenu: currentMenu, 
      menuMaxScroll: dialDiameter * dialMenu.length,
      dialIndex: dialIndex,
      dialMenu: dialMenu
    });

    //return new menu if needed
    return currentMenu;
  }

  calculateAnimationsPoints = (fullMenu) => {
    let {breakPoint} = this.state;
    //used for for-loop below
    let x = 0; 
    //when new menu item enters circle
    breakPoint = 360 * maxNumOfRotations / fullMenu.length; 
    //when the word is in the middle of screen
    let transitionPoint = breakPoint / 2;
    //how many times a transitions happen. each menu item has an open and close transition, 
    //that's why we times by two. Add one for the trailed menu item
    let transitionsLength = (fullMenu.length * 2) + 1;
    let currentPoint = 0;
    let opacityPoint = 1;
    let magnifyPoint = 1;
    let points = [];
    let magnifyPoints = [];
    let opacityPoints = [];

    //creating animation tweens
    for(x;x<transitionsLength;x++){
      points.push(currentPoint); // [0,40] all in degrees - when the word is in the middle
      opacityPoints.push(opacityPoint); // [0.5,1,...] all in opacity units
      magnifyPoints.push(magnifyPoint) // [0.1,1.5,..] all in magnify units
      currentPoint = currentPoint + transitionPoint;
      opacityPoint = (opacityPoint === 1) ? 0.2 : 1;
      magnifyPoint = (magnifyPoint === 1) ? 0 : 1;
    }

    this.setState({
      transitionPoints: points, 
      opacityPoints: opacityPoints, 
      magnifyPoints: magnifyPoints, 
      breakPoint: breakPoint
    })
  }

  calculateMaxRotations = (fullMenu) => {
    //each menu starts with 1 loop
    let numOfRotations = 1;
    //if the current number of rotations divided by menu length isn't higher than
    //the number of defined degrees per dial item, keep adding rotations
    while(((numOfRotations * 360) / fullMenu.length) < degreesPerDialItem){
      numOfRotations++
    }
    //define the max number of rotation
    maxNumOfRotations = numOfRotations;
  }

  resetDial = (menu) => {
    const {
      scrollAnim, 
      rotateAnim
    } = this.state;
    //set rotate to 0
    rotateAnim.setValue(0) 
    //set scroll to 0
    scrollAnim.setValue(0)  
    //set state
    this.setState({
      dialIndex: 0, 
      numOfLoops: 0, 
      degreesTraveled: 0, 
      rotationIndex: 0,
      stopPoint: 0
    })  
    //get current menu
    this.getCurrentMenu('init', menu);
  }

  snapBack = () => {
    let {
      breakPoint, 
      rotateAnim, 
      scrollAnim, 
      rotationIndex, 
      currentAngle
    } = this.state;
    const {diameter} = this.props;

    //TO DO: create own dial index function
    let scrollLeftAttr = scroll.__getValue();
    let stopIndex = Math.round(Math.abs(currentAngle / breakPoint))

    let stopPoint = breakPoint * stopIndex;

    //this tells me which button to make active
    Animated.timing( // Animate over time
      rotateAnim, // Where the animation is current
      {
        toValue: stopPoint, // What I'm animating to
        easing: Easing.sin,
        duration: 300
      }
    ).start(()=>{
      if(stopPoint % 360 === 0) {
        rotateAnim.setValue(0);  
      }
    });    

    Animated.timing( // Animate over time
      scrollAnim, // Where the animation is current
      {
        toValue: (rotationIndex * 360) + stopPoint, 
        easing: Easing.sin,
        duration: 300
      }
    ).start(() => {
      if(stopPoint % 360 === 0) {
        scrollAnim.setValue(rotationIndex * 360);
      }
      this.update(stopPoint);
    });     

    this.setState({
      releaseAngle: stopPoint,
      startingAngle: stopPoint,
      stopPoint: stopPoint,
      currentAngle: stopPoint,
      degreesTraveled: (rotationIndex * 360) + stopPoint
    }) 
  }

  componentWillMount () {
    const {dialMenu} = this.state;
    //touch events
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (e, gestureState) => {
        //allow click when we're aren't scrolling
        return gestureState.dx != 0 && gestureState.dy != 0;
      },
      onPanResponderMove: (e, gestureState) => {
        //update angle on scroll
        this.updateAngle(gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        //snap back when you release dial
        this.snapBack(gestureState);
      },
    });
    //reset dial
    this.resetDial(dialMenu);
  }

  render () {
    const {      
      dialIndex,
      menuMaxScroll,
      dialMenu,
      transitionPoints,
      magnifyPoints,
      opacityPoints, 
      breakPoint,
      dialDiameter,
      currentAngle, 
      numOfLoops, 
      currentMenu,
      degreesTraveled,
      numOfMenuChanges,
      rotationIndex
    } = this.state;

    const {
      dialStyle,
      diameter,
      onMenuClick
    } = this.props;

    const rotate = this.state.rotateAnim.interpolate({
      inputRange: [0,360],
      outputRange: ['0deg','360deg'] 
    })


    const touchLoops = [];


    const rightMaskRotate = this.state.rotateAnim.interpolate({
      inputRange: [0,179.9,180,360],
      outputRange: ['0deg','180deg','0deg','0deg'] 
    })  

    const rightMaskColor = this.state.rotateAnim.interpolate({
      inputRange: [0,179.9,180,360],
      outputRange: ['rgba(255,255,255,1)','rgba(255,255,255,1)','rgba(222,222,222,1)','rgba(222,222,222,1)'] 
    })  

    const leftMaskRotate = this.state.rotateAnim.interpolate({
      inputRange: [0,179.9,180,360],
      outputRange: ['0deg','0deg','0deg','180deg'] 
    })  

    const leftMaskOpacity = this.state.rotateAnim.interpolate({
      inputRange: [0, 179.9,180,360],
      outputRange: [1,1,1,1] 
    })  

    scroll = this.state.scrollAnim.interpolate({
      inputRange: [0,360 * maxNumOfRotations],
      outputRange: [0,-menuMaxScroll],
      extrapolate: 'clamp'
    }) 

    const magnify = this.state.scrollAnim.interpolate({
      inputRange: transitionPoints,
      outputRange: magnifyPoints 
    })    

    const fadeOut = this.state.scrollAnim.interpolate({
      inputRange: transitionPoints,
      outputRange: opacityPoints
    })    


    //TO Do. move this somewhere else
    for(let x = 0; x<rotationIndex; x++){
      touchLoops.push(x)
    }

    //TO DO: do ...state
    return (
        <View
          onLayout={(nativeEvent) => this.onLayout(nativeEvent)}
          ref={(node) => { this.self = node }}
          style={[styles.coverResponder,dialStyle,{width: diameter}]}
          {...this._panResponder.panHandlers}>
          <DialKnob rotateAnim={rotate} diameter={diameter}/>
          <DialMenu {...this.state}  scrollAnim={scroll} magnifyAnim={magnify} fadeAnim={fadeOut} updateMenuState={this.updateMenuState} update={onMenuClick}/>
          <TouchPath rightMaskRotate={rightMaskRotate} touchLoops={touchLoops} rightMaskColor={rightMaskColor} leftMaskRotate={leftMaskRotate} leftMaskOpacity={leftMaskOpacity} style={{height: dialDiameter - 20, width: dialDiameter - 20}}/>
        </View>
    )
  }
}

