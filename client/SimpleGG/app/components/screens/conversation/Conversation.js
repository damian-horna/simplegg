import React from 'react';
import {FlatList, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import global from "../../../Global.style";
import connect from "react-redux/es/connect/connect";
import NavBack from "../../navbars/NavBack";
import {selectUser} from "../../../redux-modules/server/actions";
import {Icon} from "react-native-elements";
import styles from './Conversation.style';

const ITEM_HEIGHT = 50;

class ConversationScreen extends React.Component {

    renderItem = ({item}) => {
        return <View
            style={styles.messageRowContainer}>
            <View
                style={[styles.bubbleView, {alignItems: item.sendByMe ? 'flex-end' : 'flex-start'}, item.sendByMe ? {marginLeft: 50} : {marginRight: 50}]}>
                <Text
                    style={styles.userText}>
                    {item.sendByMe ? 'Me' : this.props.selectedUserName}
                </Text>
                <Text
                    style={styles.messageText}>
                    {item.content}
                </Text>
            </View>
        </View>
    };

    emptyList = () => {
        return (
            <Text
                style={styles.placeholder}>
                Placeholder
            </Text>
        )
    };

    itemLayout = (data, index) => (
        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
    );

    handleMessageChange(message) {

    }

    handleButtonPress() {

    }

    render() {
        const data = this.props.messages;
        const contentContainerStyle = data.length ? null : styles.flatlistContainerStyle;
        return (
            <View style={global.container}>
                <ImageBackground source={require('../../../assets/bg_simple.png')}
                                 style={global.fullWidthAndHeight}>
                    <NavBack title={this.props.selectedUserName} navigation={this.props.navigation}/>

                    <FlatList
                        style={styles.listContainer}
                        contentContainerStyle={contentContainerStyle}
                        data={data}
                        keyExtractor={item => item.time}
                        renderItem={this.renderItem}
                        getItemLayout={this.itemLayout}
                        ListEmptyComponent={this.emptyList}
                        inverted
                    />
                    <View style={styles.msgContainer}>
                        <TextInput
                            style={styles.textInput}
                            returnKeyType='send'
                            onChangeText={this.handleMessageChange}
                            underlineColorAndroid={'transparent'}/>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleButtonPress}>
                            <Icon name={'send'} color={'#5db3dd'}/>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        contacts: state.serverReducer.contacts,
        selectedUserIndex: state.serverReducer.selectedUserIndex,
        selectedUserName: state.serverReducer.contacts[state.serverReducer.selectedUserIndex].name,
        messages: state.serverReducer.messages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectUser: (index) => dispatch(selectUser(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen);