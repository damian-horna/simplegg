import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';

export default class SideMenu extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
                    <FlatList data={[
                        {
                            name: 'Contacts',
                            key: 'Contacts',
                            action: () => {
                                this.props.navigation.navigate('Contacts');
                            }
                        },
                        {
                            name: 'Messages',
                            key: 'Messages',
                            action: () => {
                                this.props.navigation.navigate("Messages")
                            }
                        },
                        {
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
                                          <Text style={styles.label}>{item.key}</Text>
                                      </View>
                                  </TouchableOpacity>
                              }
                    />
                </SafeAreaView>
            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};