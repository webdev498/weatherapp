import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import { Login } from 'react-native-md-motion-buttons';

const { width, height } = Dimensions.get("window");

const background = require("../../public/assets/images/login1_bg.png");
const mark = require("../../public/assets/images/sl-logo-280.png");
const lockIcon = require("../../public/assets/images/login1_lock.png");
const personIcon = require("../../public/assets/images/login1_person.png");

class Home extends Component {
  render() {

    console.log("Home props : ", this.props);

    return (
      <View style={styles.container}>
        <Text>
          New Screen
        </Text>
      </View>
    )
  }
}

export default class LoginScreen extends Component {

  componentDidMount() {
    
    let loginBtn = this.refs.fakeLoginBtn;
  }

  render() {
    const promise = () => new Promise((resolve, reject) => setTimeout (() => resolve(), 2000));

    return (
      <Login.View style={styles.container} homeScreen={this._reactInternalInstance._currentElement._owner._instance}>
        <Image source={background} style={styles.background} resizeMode="cover"/>
        <View style={styles.subcontainer}>
          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
            <View style={styles.welcomeWrap}>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.welcomeSubText}>Please sign up below.</Text>
            </View>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholder="Email" 
                placeholderTextColor="#FFF"
                style={styles.input} 
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholderTextColor="#FFF"
                placeholder="Password" 
                style={styles.input} 
                secureTextEntry 
              />
            </View>
            <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
{/*
            <TouchableOpacity activeOpacity={.5}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
              </View>
            </TouchableOpacity>
*/}            
            <Login.Button
              ref="fakeLoginBtn"
              onPress={promise}
              style={styles.button}/>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity activeOpacity={.5}>
                <View>
                  <Text style={styles.signupLinkText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Login.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  subcontainer: {
    position: 'absolute',
    top: 0,
    width,
    height,
  },
  markWrap: {
    // flex: 1,
    paddingVertical: 50,
    paddingLeft : 30,
    width: '70%',
    position: 'relative',
  },
  mark: {
    width: null,
    // height: null,
    // flex: 1,
    // height: '50%'
  },
  background: {
    width,
    height,
    // display: 'block',
  },
  wrapper: {
    paddingVertical: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  welcomeWrap: {
    bottom: 0,
    width : '100%',
    height : 90,
    paddingTop: 50,
  },
  welcomeText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    fontWeight: 'bold',
    fontSize: 20,
  },
  welcomeSubText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  buttonLogin: {
    backgroundColor: "#FF3366",
    position: 'absolute',
    marginLeft: 30,
    marginRight: 30,
    height : 100,

  },
  button: {
    backgroundColor: "#FF3366",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});