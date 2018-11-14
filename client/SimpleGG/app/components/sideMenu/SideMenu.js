import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Icon} from "react-native-elements";
import {resetContacts, retrieveContacts} from "../../redux-modules/server/actions";
import connect from "react-redux/es/connect/connect";

class SideMenu extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
                    <FlatList data={[
                        {
                            iconName: 'message',
                            name: 'Messages',
                            key: 'Messages',
                            action: () => {
                                this.props.resetContacts();
                                this.props.retrieveContacts();
                                this.props.navigation.navigate("Messages")
                            }
                        },
                        {
                            iconName: 'settings',
                            name: 'Settings',
                            key: 'Settings',
                            action: () => {
                                this.props.navigation.navigate('Settings')
                            }
                        },
                    ]}
                              renderItem={({item}) =>
                                  <TouchableOpacity onPress={() => {
                                      item.action();
                                  }}>
                                      <View style={[styles.menuItem]}>
                                          <Icon name={item.iconName} color={'white'}/>
                                          <Text style={styles.label}>{item.key}</Text>
                                      </View>
                                  </TouchableOpacity>
                              }
                    />
                    <Text style={{color: 'white', width: '100%', textAlign: 'center'}}>Your internal id is: {this.props.id}</Text>
                </SafeAreaView>
            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

function mapStateToProps(state) {
    return {
        id: state.serverReducer.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetContacts: () => dispatch(resetContacts()),
        retrieveContacts: () => dispatch(retrieveContacts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);