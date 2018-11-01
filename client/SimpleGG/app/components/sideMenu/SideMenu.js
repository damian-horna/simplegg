import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Icon} from "react-native-elements";

export default class SideMenu extends Component {
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
                </SafeAreaView>
            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};