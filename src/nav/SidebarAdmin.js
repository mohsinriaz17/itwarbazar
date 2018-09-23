import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './Sidebar.style';
import PropTypes from 'prop-types';

class DrawerContentAdmin extends Component {

  navigateToScreen = (route) => () => {
    const navigate = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigate);
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>

          <Text style={styles.separatorTop}>
          </Text>
<Button
            raised
            //icon={{name: 'trash-o', type: 'font-awesome', size: 20}}
            title='Select Stall'
            buttonStyle={styles.button}
            onPress={this.navigateToScreen('AStallSelectionScreen')}/>
			
		  <Text style={styles.sectionHeadingStyle}>
          </Text>
		  
          <Button
            raised
            //icon={{name: 'trash-o', type: 'font-awesome', size: 20}}
            title='View'
            buttonStyle={styles.button}
            onPress={this.navigateToScreen('AStallScreen')}/>
			
		  <Text style={styles.sectionHeadingStyle}>
          </Text>

          <Button
            raised
            //icon={{name: 'umbrella', type: 'font-awesome', size: 20}}
            title='Upload'
            buttonStyle={styles.button}
            onPress={this.navigateToScreen('AUploadScreen')}/>

          <Text style={styles.sectionHeadingStyle}>
          </Text>

          <Button
            raised
            //icon={{name: 'umbrella', type: 'font-awesome', size: 20}}
            title='Delete'
            buttonStyle={styles.button}
            onPress={this.navigateToScreen('ADeleteScreen')}/>

          
        </ScrollView>
      </View>
    );
  }
}

DrawerContentAdmin.propTypes = {
  navigation: PropTypes.object
};

export default DrawerContentAdmin;