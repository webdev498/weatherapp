import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, StatusBar, Navigator } from 'react-native';
import Weather from './weather';
import ControllerStatus from './controller_status';
import InspectionStatus from './inspection_status';
import ControllerFaults from './controller_faults';
import ControllerDelays from './controller_delays';
import WaterConsumptionContainer from '../containers/LocationContainer'


const styles = StyleSheet.create({
  header: {
    height: 60,
    borderStyle: 'solid',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },  
  container: {
    height: '100%',
    width: '100%',
  },
});

export default class NewsFeed extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <View style={styles.container}>
          <ScrollView>
            <Weather/>
            <WaterConsumptionContainer/>
            <ControllerStatus/>
            <InspectionStatus/>
            <ControllerFaults/>
            <ControllerDelays/>
          </ScrollView>
        </View>
    );
  }
}