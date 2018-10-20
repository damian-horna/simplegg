import {
    createDrawerNavigator,
    createStackNavigator
} from 'react-navigation';

import SideMenu from './components/sideMenu/SideMenu'
import WelcomeScreen from './components/screens/welcome/Welcome.js'
import React from "react";
import SettingsScreen from "./components/screens/settings/Settings";
import MessagesScreen from "./components/screens/messages/Messages";

const Navigator = createStackNavigator({
        Welcome: {screen: WelcomeScreen},
        Settings: {screen: SettingsScreen},
        Messages: {screen: MessagesScreen}
    },
    {
        headerMode: 'none',
        initialRouteName: 'Welcome'
    }
);

Navigator.navigationOptions = () => {
    return {
        drawerLockMode: 'unlocked',
    };
};

const DrawerNavigator = createDrawerNavigator({
        Stack: {screen: Navigator},
    },
    {
        headerMode: 'none',
        contentComponent: SideMenu,
        contentOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: 'red'
        }
    });

export default DrawerNavigator;