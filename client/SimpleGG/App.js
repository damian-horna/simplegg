import React, {Component} from 'react';
import {Provider} from 'react-redux';
import NavigationService from "./app/services/NavigationService";
import store from './app/store';
import DrawerNavigator from "./app/Navigation";
import {setActiveScreen} from "./app/redux-modules/menu/actions";


const acceptedNavigationActions = ['Navigation/NAVIGATE', 'Navigation/BACK']

export default class App extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <Provider store={store}>
                <DrawerNavigator ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef)}}
                                 onNavigationStateChange={(prevState, newState, action) => {
                                     if (hasStateChanged(prevState, newState) && acceptedNavigationActions.includes(action.type)) {
                                         extractAndUpdateActiveScreen(newState);
                                     }
                                 }}/>
            </Provider>
        );
    }
}

function hasStateChanged(prevState, newState) {
    return prevState.routes[prevState.index] !== newState.routes[newState.index]
}

function extractAndUpdateActiveScreen(navState) {
    if (navState.hasOwnProperty('index')) {
        extractAndUpdateActiveScreen(navState.routes[navState.index])
    } else {
        store.dispatch(setActiveScreen(navState.routeName))
    }
}
