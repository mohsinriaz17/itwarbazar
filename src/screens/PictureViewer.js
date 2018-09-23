import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View,Dimensions} from 'react-native';
import { NavigationActions } from 'react-navigation';

import Image from 'react-native-transformable-image';

const swidth = Dimensions.get('window').width;
const sheight = Dimensions.get('window').height;

class PictureViewer extends Component {
  state = {
    modalVisible: true,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
	   let uri=this.props.navigation.getParam('uri')||'';
	   let from=this.props.navigation.getParam('from')||'Normalgallery';
	   //console.log('key',this.props.navigation);
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
			  
			  this.props.navigation.navigate(from);}}>
          <View>
            <TouchableHighlight
                onPress={() => {
                  //this.setModalVisible(!this.state.modalVisible);
				  
				  this.props.navigation.navigate(from);
				  //this.props.navigation.dispatch(NavigationActions.back());
                }}>
			
		<View style={{backgroundColor:'black',height:sheight-24,width:swidth, }}>
		<Text style={{ backgroundColor:'gray', fontSize:20, color:'white'}}
		>
		Back
		</Text>
		<Image
          style={{ height:sheight-45}}
          source={{ uri }}
        />
		</View>
			</TouchableHighlight>
            
          </View>
        </Modal>
      </View>
    );
  }
}

export default PictureViewer;