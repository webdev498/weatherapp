import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import ChartView from 'react-native-highcharts';

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
  text: {
    fontFamily: 'source-sans-regular', 
    fontSize: 16
  }
});

export default class WaterConsumption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  chartOptions = {
    chart: {
      height: 150
    },
    exporting: {
      enabled: false
    },
    title: {
      text: ''
    },
    legend: {
      enabled: false
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    yAxis: {
      visible: false,
      tickAmount: 2
    },
    series: [{
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
    }]
  };

  render() {
    console.log('===render state', this.props);
    return (
      <View style={[styles.section,styles.water_consumption]}>
        <Text style={styles.text}>How much water you have saved this year</Text>
        <ChartView style={styles.chart} config={this.chartOptions}></ChartView>
        <Text style={styles.text}>{this.props.location.city + ', ' + this.props.location.region }</Text>
      </View>
    );
  }
}