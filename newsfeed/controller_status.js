import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { Ionicons, Entypo, EvilIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  section: {
    borderStyle: 'solid',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    position: 'relative'
  },
  status: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row'
  },
  symbol: {
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  disclaimer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  text: {
    fontFamily: 'source-sans-regular',
    fontSize: 16    
  },
  message: {
    fontFamily: 'source-sans-regular',    
  },
  alert: {
    fontFamily: 'source-sans-bold',
    fontSize: 16
  },
  error: {
    fontSize: 30,
    color: '#b23230'
  },
  success: {
    fontSize: 30,
    color: '#5a7053'
  },
  warning: {
    fontSize: 30,
    color: '#957234'
  },
  info: {
    fontSize: 30,
    color: '#477fad'
  },
  errorText: {
    color: '#b23230'    
  },
  infoText: {
    color: '#477fad'
  },
  successText: {
    color: '#5a7053'    
  },
  warningText: {
    color: '#957234'    
  },
  errorSymbol: {
    borderStyle: 'solid',
    borderRightColor: '#bc8181',
    borderRightWidth: 1,
  },
  infoSymbol: {
    borderStyle: 'solid',
    borderRightColor: '#80bcde',
    borderRightWidth: 1,
  },
  successSymbol: {
    borderStyle: 'solid',
    borderRightColor: '#afcca5',
    borderRightWidth: 1,
  },
  warningSymbol: {
    borderStyle: 'solid',
    borderRightColor: '#957234',
    borderRightWidth: 1,
  },
  errorContainer: {
    backgroundColor: '#ecc8c5',
    borderStyle: 'solid',
    borderColor: '#bc8181',
    borderWidth: 1
  },
  successContainer: {
    backgroundColor: '#def2d6',
    borderStyle: 'solid',
    borderColor: '#afcca5',
    borderWidth: 1
  },
  warningContainer: {
    backgroundColor: '#f8f3d6',
    borderStyle: 'solid',
    borderColor: '#957234',
    borderWidth: 1
  },
  infoContainer: {
    backgroundColor: '#cde8f5',
    borderStyle: 'solid',
    borderColor: '#80bcde',
    borderWidth: 1
  }
});

export default class ControllerStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.section}>
        <View>
          <Text style={styles.text}>X Controller Status:</Text>
          <ControllerAlert type="error"></ControllerAlert>
          <ControllerAlert type="success"></ControllerAlert>
          <ControllerAlert type="warning"></ControllerAlert>
          <ControllerAlert type="informational"></ControllerAlert>
        </View>
      </View>
    );
  }
}


class ControllerAlert extends React.Component {
  render() {
    const {type} = this.props;
    return (
      <View>
        {type === "error" &&
          <View style={[styles.status,styles.errorContainer]}>
            <View style={[styles.symbol,styles.errorSymbol]}>
              <Ionicons name="ios-close-circle-outline" style={styles.error} />
            </View>
            <View style={styles.disclaimer}>
              <Text style={[styles.alert,styles.errorText]}>Error</Text>
              <Text style={[styles.message, styles.errorText]}>Here is the error message</Text>
            </View>
          </View>
        }
        {type === "success" &&
          <View style={[styles.status,styles.successContainer]}>
            <View style={[styles.symbol,styles.successSymbol]}>
              <Ionicons name="ios-checkmark-circle-outline" style={styles.success} />
            </View>
            <View style={styles.disclaimer}>
              <Text style={[styles.alert,styles.successText]}>Success</Text>
              <Text style={[styles.message, styles.successText]}>Here is the success message</Text>
            </View>
          </View>
        }
        {type === "warning" &&
          <View style={[styles.status,styles.warningContainer]}>
            <View style={[styles.symbol,styles.warningSymbol]}>
              <Ionicons name="ios-alert-outline" style={styles.warning} />
            </View>
            <View style={styles.disclaimer}>
              <Text style={[styles.alert,styles.warningText]}>Warning</Text>
              <Text style={[styles.message, styles.warningText]}>Here is the success message</Text>
            </View>
          </View>
        }
        {type === "informational" &&
          <View style={[styles.status,styles.infoContainer]}>
            <View style={[styles.symbol,styles.infoSymbol]}>
              <Ionicons name="ios-information-circle-outline" style={styles.info} />
            </View>
            <View style={styles.disclaimer}>
              <Text style={[styles.alert,styles.infoText]}>Info</Text>
              <Text style={[styles.message, styles.infoText]}>User pending action</Text>
            </View>
          </View>
        }
      </View>
    );
  }
}



