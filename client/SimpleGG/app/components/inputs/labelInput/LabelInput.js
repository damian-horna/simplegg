import React from 'react';
import {Text, TextInput, View} from 'react-native';
import common from '../InputBase.styles'
import InputBase from "../InputBase";

export default class LabelInput extends InputBase {

    render() {
        return (
            <View style={common.container}>
                <View style={common.flexRow}>
                    <Text style={[common.label, {color: this.state.labelColor}]}>{this.props.label}</Text>
                </View>
                <View style={common.row}>
                    <TextInput keyboardType='default'
                               autoFocus={this.props.isFocused}
                               onFocus={() => this.onFocus()}
                               onBlur={() => this.onBlur()}
                               onChangeText={
                                   (value) => {
                                       if (this.props.bindValue) {
                                           this.bindValue(value);
                                       }
                                   }
                               }
                               underlineColorAndroid='transparent' style={common.input}
                               placeholder={this.props.placeholder}
                               placeholderTextColor={'#635d85'} value={this.props.value}/>
                    <View style={[common.underlay, {borderColor: this.state.borderColor}]}/>
                </View>
            </View>
        )
    }
}