import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View, KeyboardAvoidingView} from 'react-native';
import styles from './Settings.style.js';
import global from "../../../Global.style";
import LabelInput from "../../inputs/labelInput/LabelInput";
import {connect} from "react-redux";
import {setServerAddressAndPort} from "../../../redux-modules/server/actions";

class SettingsScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            serverAddress: '',
            port: '',
        };
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/bg_simple.png')}
                                 style={global.fullWidthAndHeight}>

                    <View style={styles.textArea}>
                        <LabelInput label='Server address'
                                    bindValue={v => this.setState({...this.state, serverAddress: v})}/>
                        <LabelInput label='Port'
                                    bindValue={v => this.setState({...this.state, port: v})}/>
                    </View>

                    <KeyboardAvoidingView behavior="height" enabled>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.setServerAddressAndPort(this.state.serverAddress, this.state.port);
                                this.props.navigation.navigate('Welcome')}}
                            style={global.button}>
                            <Text style={global.buttonText}>CONFIRM</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        setServerAddressAndPort: (serverAddress, port) => dispatch(setServerAddressAndPort(serverAddress, port))
    }
}

export default connect((state) => {return {}},mapDispatchToProps)(SettingsScreen);