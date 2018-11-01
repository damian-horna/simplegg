import React from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import global from '../../Global.style';
import common from './NavbarsCommon.style';


export default function NavBack ({navigation, title, addAction}) {
    return (
        <View style={common.container}>
            <View style={common.navbar}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }} style={common.leftIcon}>
                    <View><Image source={require('../../assets/left-arrow.png')}
                                 style={common.leftArrowIcon}/></View>
                </TouchableOpacity>
                <Text style={global.title}>{title}</Text>
                <View style={common.rightIcon}></View>
            </View>
        </View>
    )
}