import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View, KeyboardAvoidingView} from 'react-native';
import styles from './Messages.style.js';
import global from "../../Global.style";
import LabelInput from "../../inputs/labelInput/LabelInput";
import {connect} from "react-redux";
import {sendMessage} from "../../../redux-modules/server/actions";


class MessagesScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            message: '',
        };
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/bg_simple.png')}
                                 style={global.fullWidthAndHeight}>

                    <View style={styles.textArea}>
                        <LabelInput label='message'
                                    bindValue={v => this.setState({...this.state, message: v})}/>
                        <LabelInput label='response'
                                    value={this.props.response}/>
                    </View>

                    <KeyboardAvoidingView behavior="height" enabled>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.sendMessage(this.props.host, this.props.port, this.state.message);
                                }}
                            style={global.button}>
                            <Text style={global.buttonText}>CONFIRM</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>

        );
    }
}

function mapStateToProps(state) {
    return {
        host: state.serverReducer.serverAddress,
        port: state.serverReducer.port,
        response: state.serverReducer.response
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (host, port, msg) => dispatch(sendMessage(host, port, msg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);
