import {
    createDrawerNavigator,
    createStackNavigator
} from 'react-navigation';

import SideMenu from './components/sideMenu/SideMenu'
import WelcomeScreen from './components/screens/welcome/Welcome.js'
import React from "react";

const Navigator = createStackNavigator({
        Welcome: {screen: WelcomeScreen},
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