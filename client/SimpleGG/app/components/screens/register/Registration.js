import React from 'react';
import {ImageBackground, KeyboardAvoidingView, View} from 'react-native';
import styles from './Registration.style.js';
import global from "../../../Global.style";
import LabelInput from "../../inputs/labelInput/LabelInput";
import {connect} from "react-redux";
import {Icon} from "react-native-elements";
import {register, retrieveContacts} from "../../../redux-modules/server/actions";
import NavTitle from "../../navbars/NavTitle";

class RegistrationScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
        };
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/bg_simple.png')}
                                 style={global.fullWidthAndHeight}>
                    <NavTitle title='Registration'
                             navigation={this.props.navigation}/>
                    <View style={styles.textArea}>
                        <LabelInput label='Provide a name: '
                                    bindValue={v => this.setState({...this.state, name: v})}/>
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
                                    this.props.register(this.state.name);
                                    this.props.retrieveContacts();
                                    navigate('Messages')
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
        register: (name) => dispatch(register(name)),
        retrieveContacts: () => dispatch(retrieveContacts())
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);