//styling
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';


class AAuthScreen extends Component {
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
	   <Text> AAuthScreen </Text>
	   <Button
            raised
            //icon={{name: 'trash-o', type: 'font-awesome', size: 20}}
            title='temperory button'
            
            onPress={()=>{this.props.navigation.navigate('managerdrawr')}}/>
			
      </View>
    );
  }
}

export default AAuthScreen;