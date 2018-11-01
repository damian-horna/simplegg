import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView} from 'react-native';
import styles from './Messages.style.js';
import global from "../../../Global.style";
import connect from "react-redux/es/connect/connect";
import EStyleSheet from 'react-native-extended-stylesheet';
import NavAdd from "../../navbars/NavAdd";
import Icon from 'react-native-vector-icons/FontAwesome';

class MessagesScreen extends React.Component {
    render() {
        return (
            <View style={global.container}>
                <ImageBackground source={require('../../../assets/bg_simple.png')}
                                 style={global.fullWidthAndHeight}>
                    <NavAdd title='Messages' addAction={() => {
                        this.props.navigation.navigate('ContactAddScreen')
                    }} navigation={this.props.navigation}/>
                    <ScrollView>
                        {this.props.contacts.map((obj, i) => {
                            return (
                                <TouchableOpacity style={styles.contactWrapper} key={i}>
                                    <View
                                        style={EStyleSheet.child(styles, 'contact', i, this.props.contacts.length)}>
                                        <Text style={styles.transactionTitle}>{obj.name}</Text>
                                        <Icon name={'paper-plane'} color={'white'}/>
                                    </View>
                                </TouchableOpacity>

                            )
                        })}
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        contacts: state.serverReducer.contacts
    }
}


export default connect(mapStateToProps)(MessagesScreen);

