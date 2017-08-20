import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import ChartView from 'react-native-highcharts';
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
  center: {
    textAlign: 'center'
  },
  warningIcon: {
    fontSize: 30,
    color: '#957234'
  },
  disclaimer: {
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 20,
    paddingLeft: 20,
  },
  warnings: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  info: {
    marginBottom: 10
  },
  warning: {
    backgroundColor: '#f8f3d6',
    borderStyle: 'solid',
    borderColor: '#957234',
    borderWidth: 1
  },
  warningText: {
    color: '#957234'    
  },
});

export default class ControllerFaults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.section}>
        <Text style={styles.info}>X Controller System Faults:</Text>
        <View style={styles.warnings}>
          <ControllerFault type="warning"></ControllerFault>
          <ControllerFault type="warning"></ControllerFault>
        </View>
      </View>
    );
  }
}

class ControllerFault extends React.Component {
  render() {
    const {type} = this.props;
    return (
      <View style={styles.warnings}>
        {type === "warning" &&
          <View style={[styles.disclaimer,styles.warning]}>
            <EvilIcons name="exclamation" style={[styles.center,styles.warningIcon]} />
            <Text style={[styles.center, styles.warningText]}>System Fault</Text>
          </View>
        }
      </View>
    );
  }
}