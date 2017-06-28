import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ChartView from 'react-native-highcharts';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Weather></Weather>
        <WaterConsumption></WaterConsumption>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>81°</Text>
        <Text>Controller Location</Text>
        <Text>City, State</Text>
      </View>
    );
  }
}

class WaterConsumption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  chartOptions = {
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
      labels: {
        style: {"fontSize":"35px"}
      }
    },
    yAxis: {
      visible: false,
      tickAmount: 2
    },
    plotOptions: {
        series: {
            marker: {
                enabled: true,
                symbol: 'circle',
                radius: 15
            }
        }
    },
    series: [{
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
    }]
  };

  render() {
    return (
      <View>
        <Text>How much water you have saved this year</Text>
        <ChartView style={{height:100}} config={this.chartOptions}></ChartView>
        <Text>City, State</Text>
      </View>
    );
  }
}