//styling
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Picker,
  ScrollView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Card, Button } from 'react-native-elements'


class StallSelectionScreen extends Component {
	static navigationOptions = {
	title:'Stall Selector',

}
state={
	alphavalue:"A",
	numvalue:"1",
}
  componentWillMount() {
    
  }
  componentDidMount() {
   
  }
  
  componentWillReceiveProps(nextProps){
   
  }
  
  render() {
    return (
      <ScrollView>
		<Card title="Select Alphabet">
		<Picker
            //style={{height:200, width:200 }}
            selectedValue={this.state.alphavalue}
            onValueChange={(value) => this.setState({alphavalue:value})}
          >
            <Picker.Item label="A" value="A" />
            <Picker.Item label="B" value="B" />
            <Picker.Item label="C" value="C" />
            <Picker.Item label="D" value="D" />
            <Picker.Item label="E" value="E" />
            <Picker.Item label="F" value="F" />
            <Picker.Item label="G" value="G" />
          </Picker>
		  </Card>
		  
		  <Card title="Select Number">
		<Picker
            //style={{height:200, width:200 }}
            selectedValue={this.state.numvalue}
            onValueChange={(value) => this.setState({numvalue:value})}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
          </Picker>
		  </Card>

		<Card>
		  <Button
  title="Next"
  raised
  containerStyle={{ marginTop: 20 }}
  
  onPress={()=>{this.props.navigation.navigate('StallScreen',{stall:this.state.alphavalue+""+this.state.numvalue});}}
/>
</Card>
	</ScrollView>
    );
  }
}

export default StallSelectionScreen;