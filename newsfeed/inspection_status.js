import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  section: {
    borderStyle: 'solid',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    position: 'relative'
  },
  chart: {
    height:150
  },
  bold: {
    fontWeight: 'bold'
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    paddingTop: 15,
    paddingRight: 50,
    paddingBottom: 15,
    paddingLeft: 50,
    textAlign: 'center',
    backgroundColor: '#fff',
    fontSize: 17,
    fontFamily: 'source-sans-bold',
    backgroundColor: '#def2d6',
    borderStyle: 'solid',
    borderColor: '#afcca5',
    borderWidth: 1,
    color: '#5a7053',
    borderRadius: 5
  }
});

export default class InspectionStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = () => {
    alert('Yaay Button Pressed')
  }

  render() {
    return (
      <View style={styles.section}>
        <Text>It's been over
          <Text style={styles.bold}> 30 days </Text>
          since you have done your last inspection
        </Text>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.button}>Start Inspection</Text>
        </TouchableOpacity>
      </View>
    );
  }
}