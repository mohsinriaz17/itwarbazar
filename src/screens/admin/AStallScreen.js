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
    TouchableWithoutFeedback,
} from 'react-native';
//import firebase from 'firebase';

import { NavigationActions } from 'react-navigation';
import { Icon, Card, Button, Tile } from 'react-native-elements'
import { connect } from 'react-redux';
import * as actions from '../../actions';
console.disableYellowBox = true;

class AStallScreen extends Component {
    static navigationOptions = {
        title: 'Stall',

    }
    state = {
        cat: "ETC",
        refreshing: false
    }
    componentDidMount() {
        let path = this.props.navigation.getParam('stall') || "A1";
        this.props.loadstall(path);
        console.log("did mount");
    }
    _renderinfo(stall) {
        if (_.isNull(stall)) {
            return (
                <Text>
                    "Creat Stall"
	        	</Text>
            );
        } else {
            if (_.isNull(stall.info) || _.isEmpty(stall.info)) {
                return (<ActivityIndicator size="large" />);
            }
            else {
                return (
                    <Text>
                        {`Owner:${this.props.stall.info.owner}\nPhone:${this.props.stall.info.phone}\nCatagory:${this.props.stall.info.catagory}\nStall:${this.props.stall.info.stall}`}
                    </Text>
                );
            }
        }
    }

    _renderimages(stall) {
        if (_.isNull(stall)) {
            return (
                <Text>
                    "Creat Stall"
	        	</Text>
            );
        } else {
            if (_.isNull(stall.images) || _.isEmpty(stall.images)) {
                return (<ActivityIndicator size="large" />);
            } else {
                let res = _.map(stall.images, function (value, key) {
                    return value;
                });
                return (
                    res.map((img) => {
                        return (
                            <View key={img.key}>
                                <TouchableWithoutFeedback
                                    delayLongPress={300}
                                    onPress={() => {
                                        console.log('press');
                                        this.props.navigation.navigate('Mypopup', { uri: img.src, from: 'AStallScreen' });
                                    }}
                                    onLongPress={() => {
                                        console.log('long press');
                                        const ref = firebase
                                            .storage()
                                            .ref(`/G9/Stalls/${img.stall}/`)
                                            .child(img.key);
                                        ref.delete().then(function () {
                                            // File deleted successfully
                                            console.log("file deleted");
                                            var updates = {};
                                            updates[`/G9/Stalls/${img.stall}/images/${img.key}`] = null;
                                            updates[`/G9/Recents/All/images/${img.key}`] = null;

                                            firebase.database().ref().update(updates);
                                            console.log("RTB record deleted");
                                        }).catch(function (error) {
                                            console.log("unable to delete file, error:", error);
                                        });
                                    }}
                                >
                                    <Card title={"Posted:" + img.posttime}
                                        //image={{ uri: img.thumbnail }}
                                        //imageProps={{ resizeMode: 'contain' }}

                                    >
									<Image
									source={{uri:image.thumbnail}}
									>
									</Image>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} >
                                            <Icon
                                                reverse
                                                raised
                                                name='eye'
                                                type='entypo'
                                                color='#1367ef'
                                                onPress={()=>{console.log("eye");}}
                                            />
                                            <Icon
                                                reverse
                                                raised
                                                name='delete'
                                                color='#1367ef'
                                                onPress={()=>{console.log('delete');}}
                                            />
                                        </View>
                                    </Card>
                                </TouchableWithoutFeedback>
                            </View>

                        );
                    })
                );
            }
        }
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        let path = this.props.navigation.getParam('stall') || "A1";
        this.props.loadstall(path);

    }
    componentWillReceiveProps(nextProps) {
        this.setState({ refreshing: false });
    }

    render() {
        let path = this.props.navigation.getParam('stall') || "A1";
        let cat = "ETC";
        if (_.isNull(this.props.stall) || _.isEmpty(this.props.stall.info)) {
            cat = "ETC";
        } else {
            cat = this.props.stall.info.catagory || "ETC";
        }//this.props.stall.info.catagory||"ETC";
        //console.log('cat',cat);
        return (
            <ScrollView>
                <Card title="Stall Info">

                    {this._renderinfo(this.props.stall)}
                    <Text />
                    <Button
                        title="Update Info"
                        raised
                        containerStyle={{ marginTop: 20, paddingTop: 20 }}
                        onPress={() => { this.props.navigation.navigate('AInfoScreen', { stall: path, cat }); }}
                    />
                </Card>

                <View>
                    {this._renderimages(this.props.stall)}
                    <Card>
                        <Button
                            title="Add More"
                            raised
                            containerStyle={{ marginTop: 20 }}
                            onPress={() => { this.props.navigation.navigate('AUploadScreen', { stall: path, cat }); }}
                        />
                        <Text>
                            "Long Press to Delete Image"
  </Text>
                    </Card>
                </View>

            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    console.log('state stalldownloads', state.stalldownload);
    //console.log('items',state.gallery.edges.length);
    return {
        stall: state.stalldownload
        // images: state.stalldownload.images,
        //info: state.stalldownload.info,

    };
};

export default connect(
    mapStateToProps,
    actions
)(AStallScreen);
