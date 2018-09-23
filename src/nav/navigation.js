import React from "react";
import { createBottomTabNavigator , createDrawerNavigator, createStackNavigator } from "react-navigation";

import DrawerContent from "./Sidebar";
import DrawerContentAdmin from "./SidebarAdmin";
import WelcomeScreen from '../screens/WelcomeScreen';

import APermissionsScreen from '../screens/admin/APermissionsScreen';
import AAuthScreen from '../screens/admin/AAuthScreen';
import AUploadScreen from '../screens/admin/AUploadScreen';
import ADeleteScreen from '../screens/admin/ADeleteScreen';
import AStallScreen from '../screens/admin/AStallScreen';
import AStallSelectionScreen from '../screens/admin/AStallSelectionScreen';
import AInfoScreen from '../screens/admin/AInfoScreen';

import CatagoryGalleryScreen from '../screens/CatagoryGalleryScreen';
//import PictureViewer from '../screens/PictureViewer';
import Mypopup from '../screens/Mypopup';
import StallScreen from '../screens/StallScreen';
import StallSelectionScreen from '../screens/StallSelectionScreen';


const customerstackscreens={
	  CatagoryGalleryScreen: {
screen: CatagoryGalleryScreen,
      },
	  StallSelectionScreen: {
screen: StallSelectionScreen,
      },
	   StallScreen: {
screen: StallScreen,
      },
}

const customerstacksetting={
	headerMode: 'float',

}

const customerstack = createStackNavigator(customerstackscreens,customerstacksetting)


const customerdrawrscreens={
	customerstack: {
screen: customerstack,
      },
}

const customerdrawrsetting={
	headerBackTitleVisible: false,
contentComponent: DrawerContent,
  drawerWidth: 250,
drawerPosition: 'left',
drawerOpenRoute: 'DrawerOpen',
drawerCloseRoute: 'DrawerClose',
drawerToggleRoute: 'DrawerToggle',

}

const customerdrawr= createDrawerNavigator(customerdrawrscreens,customerdrawrsetting);


const managerstackscreens={
	  AStallSelectionScreen: {
screen: AStallSelectionScreen,
      },
	  AStallScreen: {
screen: AStallScreen,
      },
	  AUploadScreen: {
screen: AUploadScreen,
      },
	  ADeleteScreen: {
screen: ADeleteScreen,
      },
	  AInfoScreen: {
screen: AInfoScreen,
      },
}

const managertacksetting={
	headerMode: 'float',

}

const managerstack = createStackNavigator(managerstackscreens,managertacksetting)


const managerdrawrscreens={
	managerstack: {
screen: managerstack,
      },
	  
}

const managerdrawrsetting={
	headerBackTitleVisible: false,
contentComponent: DrawerContentAdmin,
  drawerWidth: 250,
drawerPosition: 'left',
drawerOpenRoute: 'DrawerOpen',
drawerCloseRoute: 'DrawerClose',
drawerToggleRoute: 'DrawerToggle',

}

const managerdrawr= createDrawerNavigator(managerdrawrscreens,managerdrawrsetting);

const managertabscreens={
APermissionsScreen:{
		screen:APermissionsScreen,
	},
AAuthScreen:{
		screen:AAuthScreen,
	},
managerdrawr:{
		screen:managerdrawr,
},
	}

const managertabsettings={
	navigationOptions:{
	tabBarVisible:false
	},
	lazy:true
}

const managertab = createBottomTabNavigator(managertabscreens,managertabsettings)


const tabscreens={
WelcomeScreen:{
		screen:WelcomeScreen,
	},
customerdrawr:{
		screen:customerdrawr,
	},
managertab:{
		screen:managertab,
},
Mypopup:{
		screen:Mypopup,
},

	}

const tabsettings={
	headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
}

const starthere = createStackNavigator(tabscreens,tabsettings)

export const Nav = starthere;
