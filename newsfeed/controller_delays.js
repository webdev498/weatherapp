import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

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
  disclaimer: {
    fontSize: 13
  }
});

export default class SystemDelays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Text>Hello</Text>
    ),
  };

  render() {
    return (
      <View style={styles.section}>
        <Delay type="rain"></Delay>
      </View>
    );
  }
}

class Delay extends React.Component {
  render() {
    const {type} = this.props;
    return (
      <View>
        {type === "rain" &&
          <View>
            <Text>X Controller Rain Delay Detected!</Text>
            <Text style={styles.disclaimer}>We will delay the next watering until next
            <Text style={styles.bold}> Monday</Text>
            </Text>
          </View>
        }
      </View>
    );
  }
}
