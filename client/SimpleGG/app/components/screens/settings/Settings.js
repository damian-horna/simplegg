import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View, KeyboardAvoidingView} from 'react-native';
import styles from './Settings.style.js';
import global from "../../../Global.style";
import LabelInput from "../../inputs/labelInput/LabelInput";
import {connect} from "react-redux";
import {connectToServer, setServerAddressAndPort} from "../../../redux-modules/server/actions";
import NavTitle from "../../navbars/NavTitle";
import {Icon} from "react-native-elements";

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
                    <NavTitle title='Server info'/>
                    <View style={styles.textArea}>
                        <LabelInput label='Server address'
                                    bindValue={v => this.setState({...this.state, serverAddress: v})}/>
                        <LabelInput label='Port'
                                    bindValue={v => this.setState({...this.state, port: v})}/>
                        <Text style={styles.text}>Current server
                            address: {this.props.serverAddress + ':' + this.props.port}</Text>
                    </View>

                    <KeyboardAvoidingView behavior="height" enabled>
                        <View
                            style={global.button}>
                            <Icon
                                raised
                                name='check'
                                type='font-awesome'
                                color='white'
                                containerStyle={{backgroundColor: '#4985A8'}}
                                underlayColor='#387497'
                                onPress={() => {
                                    this.props.connectToServer(this.state.serverAddress, this.state.port);
                                    this.props.setServerAddressAndPort(this.state.serverAddress, this.state.port);
                                    this.props.navigation.navigate('Welcome')
                                }}/>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        setServerAddressAndPort: (serverAddress, port) => dispatch(setServerAddressAndPort(serverAddress, port)),
        connectToServer: (serverAddress, port) => dispatch(connectToServer(serverAddress, port))
    }
}

function mapStateToProps(state) {
    return {
        serverAddress: state.serverReducer.serverAddress,
        port: state.serverReducer.port
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);