import React from 'react';
import {ImageBackground, KeyboardAvoidingView, View} from 'react-native';
import styles from './ContactAdd.style.js';
import global from "../../../Global.style";
import LabelInput from "../../inputs/labelInput/LabelInput";
import {connect} from "react-redux";
import {Icon} from "react-native-elements";
import {addNewContact} from '../../../redux-modules/server/actions'
import NavBack from "../../navbars/NavBack";

class ContactAddScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            newContactNumber: '',
        };
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/bg_simple.png')}
                                 style={global.fullWidthAndHeight}>
                    <NavBack title='Add new contact'
                             navigation={this.props.navigation}/>
                    <View style={styles.textArea}>
                        <LabelInput label='Provide a number: '
                                    bindValue={v => this.setState({...this.state, newContactNumber: v})}/>
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
                                    this.props.addNewContact(this.state.newContactNumber);
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
        addNewContact: (contactNumber) => dispatch(addNewContact(contactNumber))
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactAddScreen);