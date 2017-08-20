import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, ListView, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons, Entypo, EvilIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  },
  site: {
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    width: '100%',
    height: 150,
    position: 'absolute',
    zIndex: 1
  },
  description: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  siteName: {
      paddingTop: 10,
      paddingBottom: 5,
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center'
  },
  pagination: {
      position: 'absolute',
      bottom: 150
  },
  location: {
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  controllersAvailable: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingTop: 20
  },
  controllerList: {
    height: 150,
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  },
  controller: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  firstController: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lastController: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  status: {
    height: 10,
    width: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  good: {
      backgroundColor: '#000'
  },
  button: {
      borderStyle: 'solid',
      borderLeftWidth: 1,
      borderLeftColor: '#ccc',
  },
  buttonText: {
      height: '100%',
      width: 80,
      textAlign: 'center',
      fontSize: 12,
      lineHeight: 39
  },
  imageContainer: {
      height: 150,
      width: '100%',
      backgroundColor: '#ccc'
  },
  imageBackground: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: 1,
      justifyContent: 'center'
  },
  missingImage: {
      fontSize: 70,
      textAlign: 'center',
      color: '#888888'
  }
});

export default class Sites extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Controller 1', 'Controller 2', 'Controller 3', 'Controller 4', 'Controller 5']),
    };
  }

  onPress = () => {

  }

  render() {
    return (
      <Swiper style={styles.swiper} paginationStyle={styles.pagination}>
        <View style={styles.container}>
          <View style={styles.site}>
            <View>
              <View style={styles.imageContainer}>
                <View style={styles.imageBackground}>
                  <Ionicons name="ios-image-outline" style={styles.missingImage} />
                </View>
                <Image source={require('../public/assets/images/default-zone-image.png')} style={styles.image} />
              </View>
              <View style={styles.description}>
                <Text style={styles.siteName}>Site Name</Text>
                <View style={styles.location}>
                  <Text style={styles.city}>City, State</Text>
                  <Text style={styles.mileage}>26mi</Text>
                </View>
                <View style={styles.controllersAvailable}>
                  <Text>3 Available Controllers</Text>
                </View>
                <ListView style={styles.controllerList}
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) => {
                    return (
                      <View style={rowData === 'Controller 5' ? styles.lastController : rowData === 'Controller 1' ? styles.firstController : styles.controller}>
                        <View style={styles.content}>
                          <View style={styles.status}></View>
                          <Text style={styles.controllerName}>{rowData}</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('DialMenu')}}>
                          <Text style={styles.buttonText}>View</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.site}>
            <View>
              <View style={styles.imageContainer}>
                <View style={styles.imageBackground}>
                  <Ionicons name="ios-image-outline" style={styles.missingImage} />
                </View>
                <Image source={require('../public/assets/images/default-zone-image.png')} style={styles.image} />
              </View>
              <View style={styles.description}>
                <Text style={styles.siteName}>Site Name</Text>
                <View style={styles.location}>
                  <Text style={styles.city}>City, State</Text>
                  <Text style={styles.mileage}>26mi</Text>
                </View>
                <View style={styles.controllersAvailable}>
                  <Text>3 Available Controllers</Text>
                </View>
                <ListView style={styles.controllerList}
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) => {
                    return (
                      <View style={rowData === 'Controller 5' ? styles.lastController : rowData === 'Controller 1' ? styles.firstController : styles.controller}>
                        <View style={styles.content}>
                          <View style={styles.status}></View>
                          <Text style={styles.controllerName}>{rowData}</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('DialMenu')}}>
                          <Text style={styles.buttonText}>View</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Swiper>
    );
  }
}



