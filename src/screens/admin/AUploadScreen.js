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
} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import { Icon, Card, Button } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/Entypo';
import uuid from 'uuid';
//console.disableYellowBox = true;

class AUploadScreen extends React.Component {
	static navigationOptions = {
	title:'Upload Image',
}
  state = {
    image: null,
    uploading: false,
  };
  
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
	//console.log(this.state);
  }

  render() {
    let { image } = this.state;
	let path=this.props.navigation.getParam('stall')||"A1";
	//console.log('path',path);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image ? null : (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              marginHorizontal: 15,
            }}>
            Select From Gallery or Take a Picture
          </Text>
        )}
<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <Icon
		reverse
		raised
  name='images'
  type='entypo'
  color='#1367ef'
		onPress={this._pickImage}
		/>
		
		<Icon
		reverse
		raised
  name='camera'
  type='entypo'
  color='#1367ef'
		onPress={this._takePhoto}
		/>
		
</View>

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
      </View>
    );
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      //aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      //aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
	  let path=this.props.navigation.getParam('stall')||"A1";
	  let cat=this.props.navigation.getParam('cat')||"uncut";
    try {
      this.setState({ uploading: true });
	//	console.log('picker result:',pickerResult);
      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri,path,cat);
        this.setState({ image: uploadUrl });
	
      }
    } catch (e) {
      console.log('err in uploading:',e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
	  //navigate here
    }
  };
}


async function uploadImageAsync(uri,path,cat) {
	
  const response = await fetch(uri);
  let id=uuid.v4();
  id=""+path+"-"+id;
  var dd= Date.now();
  const blob = await response.blob();
  const ref = firebase
    .storage()
    .ref(`/G9/Stalls/${path}/`)
    .child(id);
	  //console.log('stall:',path);
	  //console.log('id:',id);
  const snapshot = await ref.put(blob);
  const url=snapshot.ref.getDownloadURL().then(
	(downloadURL)=>{
      //console.log('File available at', downloadURL);
	  //push object to real time db here
	  var postData = {
    //src: downloadURL,
    key: id,
    stall: path,
    catagory: cat,
	posttime: dd
  };
  //var newPostKey = firebase.database().ref().child(id).push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates[`/G9/Stalls/${path}/images/${id}`] = postData;
  updates[`/G9/Recents/All/images/${id}`] = postData;
  
  firebase.database().ref().update(updates);
	//console.log('all done');
  //return url;
});
}


export default AUploadScreen;