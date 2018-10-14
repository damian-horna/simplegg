import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import styles from './Welcome.style.js';
import global from "../../Global.style";

export default class WelcomeScreen extends React.Component {

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/bg_simple.png')}
                                 style={global.fullWidthAndHeight}>
                    <View style={styles.textArea}>
                        <Text style={styles.titleText}>Gadu Gadu</Text>
                        <Text style={styles.text}>Let's chat</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate('Login')} style={styles.register}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>

        );
    }
}
