import firebase from 'firebase';
import _ from 'lodash';
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
//import firebase from 'firebase';

import { NavigationActions } from 'react-navigation';
import { Card, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import * as actions from '../actions';
console.disableYellowBox = true;

class StallScreen extends Component {
	static navigationOptions = {
	title:'Stall',

}
state={
	cat:"ETC"
}
  componentDidMount() {
	let path=this.props.navigation.getParam('stall')||"A1";
   this.props.loadstall(path);
   console.log("did mount");
  }
  _renderinfo(stall){
	  //console.log('stall isNull:',_.isNull(stall));
	  //console.log('stall info isNull:',_.isNull(stall.info));
	  
  
	 // console.log('isempty__',_.isEmpty(images));
	  //images.foreach((image)=>{console.log('img',image)});
	  if(_.isNull(stall))
	  {
		  //console.log('stall info isEmpty:',_.isEmpty(stall.info));
		  
		  return (
		<Text>
		"Cannot Find Stall in Database"
		</Text>
		);
	  }else{
	  	if(_.isNull(stall.info)||_.isEmpty(stall.info)){
		return(<ActivityIndicator size="large" />);
		} 
		else{
		//console.log('returning else');
		
		return (
		<Text>
		{`Owner:${this.props.stall.info.owner}\nPhone:${this.props.stall.info.phone}\nCatagory:${this.props.stall.info.catagory}\nStall:${this.props.stall.info.stall}`}
		</Text>
		);
		}
	  }
	}
	
  _renderimages(stall){
	 // console.log('imges',images);
	 // console.log('isempty__',_.isEmpty(images));
	  //images.foreach((image)=>{console.log('img',image)});
	  if(_.isNull(stall))
	  {
		  return (
		<Text>
		"Cannot Find Stall in Database"
		</Text>
		);
	  }else{
	  	if(_.isNull(stall.images)||_.isEmpty(stall.images)){
		return(<ActivityIndicator size="large" />);
		} else{
		//console.log('returning else');	
		let res=_.map(stall.images,function(value,key){
			//console.log('value',value.posttime);
			//console.log('key',key);
			return value;
		});
		//console.log('res:',res);
		//console.log('total:',res.map((img)=><Card title={img.posttime}/>));
		//console.log();
		return (
		res.map((img) =>{ 
			return(
		<View key={img.key}>
		<TouchableOpacity
		
		onPress={()=>{
			console.log('press');
			this.props.navigation.navigate('Mypopup',{uri:img.src,from:'StallScreen'});
			}}
		>
		<Card title={"Posted:"+img.posttime}
		 image={{uri:img.thumbnail}}
		 imageProps={{resizeMode:'contain'}}
		 
		>
		</Card>
		</TouchableOpacity>
		</View>
		
		);
		})
		);
		}
	  }
	}
  render() {
	  let path=this.props.navigation.getParam('stall')||"A1";
	  let cat="ETC";
	  if(_.isNull(this.props.stall)||_.isEmpty(this.props.stall.info))
	  {
		  cat="ETC";
	  }else{
	  cat=this.props.stall.info.catagory||"ETC";
  }//this.props.stall.info.catagory||"ETC";
	  //console.log('cat',cat);
    return (
      <ScrollView>
	  <Card title="Stall Info">
	  {this._renderinfo(this.props.stall)}
	  	  
	  </Card>
		
	<Card title="Images">
		{this._renderimages(this.props.stall)}
		</Card>
	    </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  	console.log('state stalldownloads',state.stalldownload);
  //console.log('items',state.gallery.edges.length);
  return {
	  stall:state.stalldownload
   // images: state.stalldownload.images,
	//info: state.stalldownload.info,
    
  };
};

export default connect(
  mapStateToProps,
  actions
)(StallScreen);
