import React, {Component} from 'react';
import {Provider} from 'react-redux';
import NavigationService from "./app/services/NavigationService";
import store from './app/store';
import DrawerNavigator from "./app/Navigation";

export default class App extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <Provider store={store}>
                <DrawerNavigator ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                }}
                />
            </Provider>
        );
    }
}

function hasStateChanged(prevState, newState) {
    return prevState.routes[prevState.index] !== newState.routes[newState.index]
}

