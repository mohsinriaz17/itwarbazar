//styling
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import { NavigationActions } from 'react-navigation';


class ADeleteScreen extends Component {
	static navigationOptions = {
	title:'set title',

}
  componentWillMount() {
    
  }
  componentDidMount() {
   
  }
  
  componentWillReceiveProps(nextProps){
   
  }
  
  render() {
    return (
      <View>
	  <Text> ADeleteScreen </Text>
      </View>
    );
  }
}

export default ADeleteScreen;