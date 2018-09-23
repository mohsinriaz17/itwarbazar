import firebase from 'firebase';
import React from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  Dimensions,
  TextInput
} from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
const SCREEN_WIDTH = Dimensions.get('window').width;
//console.disableYellowBox = true;

class AInfoScreen extends React.Component {
	static navigationOptions = {
	title:'Update Info',
}
  state={
	owner:"",
	phone:"",
	catvalue:"ETC"
}
  componentDidMount() {
  //console.log(this.state);
  }

  render() {
  
let path=this.props.navigation.getParam('stall')||"A1";
	//console.log('path',path);
    return (
    <View>
	<Card title = "Owner Info">
	<TextInput
          style={{height: 40}}
          placeholder="Owner"
          onChangeText={(owner) => this.setState({owner})}
        />
		<TextInput
          style={{height: 40}}
          placeholder="Phone"
          onChangeText={(phone) => this.setState({phone})}
        />
	
		</Card>
	<Card title = "Select Catagory">
	<Picker
	selectedValue = {this.state.catvalue}
	onValueChange = {(value) => this.setState({catvalue: value})}>
	<Picker.Item label = "Ready Made" value = "ReadyMade" />
	<Picker.Item label = "Un-Cut" value = "UnCut" />
	<Picker.Item label = "Home Decore" value = "HomeDecore" />
	<Picker.Item label = "Food" value = "Food" />
	<Picker.Item label = "Electronics" value = "Electronics" />
	<Picker.Item label = "Shoes" value = "Shoes" />
	<Picker.Item label = "ETC" value = "ETC"/>
	</Picker>
	</Card>
	<Card>
		  <Button
  title="Update"
  raised
  containerStyle={{ marginTop: 20 }}
  onPress={()=>{this.updateinfo(this.state.owner,this.state.phone,this.state.catvalue,path);}}
/>
</Card>
	<StatusBar barStyle="default" />
	</View>
    );
  }

 updateinfo(owner,phone,catagory,path) {
	
    //push object to real time db here
	  var postData = {
    owner,
    phone,
    catagory,
	stall:path
	
  }
  var newPostKey = firebase.database().ref(`/G9/Stalls/${path}/info`).set(postData).then(()=>{this.props.navigation.navigate('AStallScreen',{path});}).catch((err)=>{alert('Copied image URL to clipboard'); console.log('err',err)});
	//console.log('newpostkey:',newPostKey);
  // Write the new post's data simultaneously in the posts list and the user's post list.
  
}


}


export default AInfoScreen;