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
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
//import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Entypo';
import { NavigationActions } from 'react-navigation';
import { Card, Button,ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux';
import * as actions from '../actions';
const swidth = Dimensions.get('window').width;
console.disableYellowBox = true;

class CatagoryGalleryScreen extends Component {
	static navigationOptions=({ navigation }) => {
	return {
	headerTitle:'Recent Uploads',
	headerLeft: (
				<Icon
            name="menu"
            size={30}
            color='blue'
            onPress={() => navigation.toggleDrawer()} />
		)
	};
};
constructor () {
  super()
  this.state = {
	  GridColumnsValue: true,
      ButtonDefaultText: 'CHANGE TO GRIDVIEW',
      isLoading: true,
    selectedIndex: 0
  }
  this.updateIndex = this.updateIndex.bind(this)
}
updateIndex (selectedIndex) {
  this.setState({selectedIndex})
  console.log('selected:',this.state.selectedIndex);
      if(this.state.selectedIndex == 0)
		{
            this.setState({
                GridColumnsValue: false,
                ButtonDefaultText : "CHANGE TO LISTVIEW"
            })
        }
        else{
			this.setState({
                GridColumnsValue: true,
                ButtonDefaultText : "CHANGE TO GRIDVIEW"
            })
        }
}

	 ChangeGridValueFunction =()=> {
        if(this.state.GridColumnsValue === true)
		{
            this.setState({
                GridColumnsValue: false,
                ButtonDefaultText : "CHANGE TO LISTVIEW"
            })
        }
        else{
			this.setState({
                GridColumnsValue: true,
                ButtonDefaultText : "CHANGE TO GRIDVIEW"
            })
        }
         }

componentDidMount() {
   this.props.loadrecentsall();
  }
  
  _renderItem = ({ item,index }) => {
	  if(this.state.GridColumnsValue)
	  {
		  return (
      <View style={{flex:1, flexDirection: 'row', margin:1}}>
        <TouchableOpacity
		
		onPress={()=>{
			console.log('press');
			this.props.navigation.navigate('Mypopup',{uri:img.src,from:'CatagoryGalleryScreen'});
			}}
		>
		<Image
          style={{ justifyContent: 'center',
     flex:1,
     alignItems: 'center',
     height: swidth/2,
	    backgroundColor: '#4CAF50' }}
          resizeMode="cover"
          source={{ uri: item.thumbnail }}
        />
		<View style={{flex:1, flexDirection: 'column', margin:1}}>
		<Text>Post Time:{item.posttime}</Text>
		<Text>Stall:{item.stall}</Text>
		<Text>Catagory:{item.catagory}</Text>
		</View>
      </TouchableOpacity>
      </View>
	  );
	  }else {
    return (
      <View style={{flex:1, flexDirection: 'column', margin:1}}>
	  <TouchableOpacity
		
		onPress={()=>{
			console.log('press');
			this.props.navigation.navigate('Mypopup',{uri:img.src,from:'CatagoryGalleryScreen'});
			}}
		>
        <Image
          style={{ justifyContent: 'center',
     flex:1,
     alignItems: 'center',
     height: swidth/2,
	    backgroundColor: '#4CAF50' }}
          resizeMode="cover"
          source={{ uri: item.thumbnail }}
        />
      </TouchableOpacity>
      </View>
    );
	  }
  };
  
  _display(){
	 const { recents }= this.props;
    //console.log('function props', this.props);
    //console.log('function props photos length', this.props.photos.length);
	if(_.isNull(recents.images)||_.isEmpty(recents.images)){
		return(<ActivityIndicator size="large" />);
		} else{
		//console.log('returning else');	
		let res=_.map(recents.images,function(value,key){
			//console.log('value',value.posttime);
			//console.log('key',key);
			return value;
		});
		
//      console.log('res',res);
        return (
        
		<FlatList
          numColumns = { this.state.GridColumnsValue ? 1 : 2 }
          data={res}
          renderItem={this._renderItem}
		  key = {( this.state.GridColumnsValue ) ? 'ONE COLUMN' : 'TWO COLUMN' }
          keyExtractor={item => item.key}
          
        />
		
    );
    }
    
  }



  render() {
const component1 = () => {return(
<Text>
Details 
 </Text>
);
	}
    
	const component2 = () => <Text>Grid</Text>
	const buttons = [{ element: component1 },{ element: component2 }]
	const { selectedIndex } = this.state

    return (
      <View>
	  <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 50,marginBottom:10}}
    />
		{this._display()}
	  </View>

    );
  }
}

const styles = StyleSheet.create({
    
   MainContainer :{
    
   justifyContent: 'center',
   flex:1,
   margin: 5,
   paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    
   },
    
   ImageComponentStyle: {
    
     justifyContent: 'center',
     flex:1,
     alignItems: 'center',
     height: 100,
     backgroundColor: '#4CAF50'
    
   }
   ,
    
   ItemTextStyle: {
    
      color: '#fff',
      padding: 10,
      fontSize: 18,
      textAlign: 'center',
      backgroundColor: '#4CAF50',
      marginBottom: 5
      
    },

    ButtonStyle: {
        
           marginTop:10,
           paddingTop:15,
           paddingBottom:15,
           backgroundColor:'#FF9800',
           width: '100%',
           height: 50
         },
        
    ButtonInsideTextStyle:{
           color:'#fff',
           textAlign:'center',
    }
    
   });
   
const mapStateToProps = state => {
  	//console.log('state recents',state.recents);
  //console.log('items',state.gallery.edges.length);
  return {
	  recents:state.recents
   // images: state.stalldownload.images,
	//info: state.stalldownload.info,
    
  };
};

export default connect(
  mapStateToProps,
  actions
)(CatagoryGalleryScreen);
