import React from 'react';
import { Text, View} from 'react-native';
import global from '../../Global.style';
import common from './NavbarsCommon.style';


export default function NavTitle ({navigation, title, addAction}) {
    return (
        <View style={common.container}>
            <View style={common.navbar}>
                <View style={common.leftIcon}></View>
                <Text style={global.title}>{title}</Text>
                <View style={common.rightIcon}></View>
            </View>
        </View>
    )
}