import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { NavigationActions } from 'react-navigation';
import Slides from '../components/Slides';

const SLIDE_DATA = [
 // { text: 'Welcome to Itwar Bazar App', color: '#03A9F4' },
 // { text: 'The App is to show you what is avaialble in Itwar Bazar by catagory and by stalls', color: '#009688' },
 // { text: 'Select your catagory from menu', color: '#009688' },
  { text: 'Please Select if you are a manager or a customer', color: '#03A9F4' }
];
import * as firebase from 'firebase';



const url =  'https://firebasestorage.googleapis.com/v0/b/blobtest-36ff6.appspot.com/o/Obsidian.jar?alt=media&token=93154b97-8bd9-46e3-a51f-67be47a4628a';

const firebaseConfig = {
  apiKey: 'AIzaSyC75U_kxRMDUz36tiIH_6FvxkaPCUOLUTI',
    authDomain: 'itwarbazar-98108.firebaseapp.com',
    databaseURL: 'https://itwarbazar-98108.firebaseio.com',
    projectId: 'itwarbazar-98108',
    storageBucket: 'itwarbazar-98108.appspot.com',
    messagingSenderId: '817640123187'
};

firebase.initializeApp(firebaseConfig);

class WelcomeScreen extends Component {
   state = { role: null }

  async componentWillMount() {
    let role = await AsyncStorage.getItem('role');
	role=null;
	console.log('role welcome:',role);
    if (role==='customer') {
      this.setState({ role });
	  this.props.navigation.navigate('customerdrawr');
    } else if(role === 'manager') {
		this.props.navigation.navigate('managertab');
      this.setState({ role });
    }
	 else {
		
      this.setState({ role: false });
    }
  }


  customer = () => {
	  console.log('customer');
	  AsyncStorage.setItem('role', 'customer');
    this.props.navigation.navigate('customerdrawr');
	
	
  }
	manager = () => {
		console.log('manager');
    AsyncStorage.setItem('role', 'manager');
	//this.props.navigation.navigate('managertab');
	this.props.navigation.navigate('AStallSelectionScreen');
  }
  render() {
    if (_.isNull(this.state.role)) {
      return <AppLoading />;
    }

    return (
	<Slides data={SLIDE_DATA} onManager={this.manager} onCustomer={this.customer} />
	
      
    );
  }
}

export default WelcomeScreen;
