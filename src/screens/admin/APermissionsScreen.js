//styling
import React, { Component } from 'react';
import {
  Text,
  View,
  CameraRoll,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Constants, Permissions } from 'expo';


class APermissionsScreen extends Component {
	static navigationOptions = {
	title:'Permissions',

}
  componentWillMount() {
    
    //console.log('permissions_will');
   // this.getpermissions();
   // this.props.initialLoad();
  }
  componentDidMount() {
    
    console.log('permissions_DID');
    this.getpermissions();
   // this.props.initialLoad();
  }
  
  componentWillReceiveProps(nextProps){
    
    //console.log('will props');
   // this.getpermissions();
   // this.props.initialLoad();
  }
  getpermissions = async () => {
    let Token = await AsyncStorage.getItem('Token');
	//Token='blabla'
    console.log('permissions token:', Token);
    if (Token === 'granted') {
		//console.log('suck');
       this.props.navigation.navigate('AAuthScreen');
       //return;
    } else {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === 'granted') {
        try {
          await AsyncStorage.setItem('Token', status);
          this.props.navigation.navigate('AAuthScreen');
        } catch (error) {
          // Error saving data
        }
        //return;
      } else {
        console.log('no permission');
      }
    }
  };
  
  render() {
    return (
      <View>
	  <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default APermissionsScreen;