import React from 'react';
import {FlatList, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import global from "../../../Global.style";
import connect from "react-redux/es/connect/connect";
import NavBack from "../../navbars/NavBack";
import {selectUser, sendMessage} from "../../../redux-modules/server/actions";
import {Icon} from "react-native-elements";
import styles from './Conversation.style';

const ITEM_HEIGHT = 50;

class ConversationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {message: ''}
    }

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
        this.setState({
            message: message
        })
    }


    render() {
        let filtered = [];
        console.log("messages: ", this.props.messages);
        console.log("sel user number: ", this.props.selectedUserNumber);
        console.log("id: ", this.props.id);
        for (let message of this.props.messages) {
            console.log("in for: ", message)
            if (message.from === this.props.selectedUserNumber && message.to === this.props.id ||
                message.from === this.props.id && message.to === this.props.selectedUserNumber) {
                console.log("inside if, pushing message")
                filtered.push(message);
            }
        }
        console.log("filtered: ", filtered);
        const data = filtered;
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
                        keyExtractor={item => item.key.toString()}
                        renderItem={this.renderItem}
                        getItemLayout={this.itemLayout}
                        ListEmptyComponent={this.emptyList}
                        inverted
                    />
                    <View style={styles.msgContainer}>
                        <TextInput
                            value={this.state.message}
                            onChange={(msg) => this.setState({message: msg})}
                            style={styles.textInput}
                            returnKeyType='send'
                            onChangeText={(t) => this.setState({message: t})}
                            underlineColorAndroid={'transparent'}/>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.props.sendMessage(this.state.message, this.props.id, this.props.selectedUserNumber);
                                this.setState({
                                    message: ''
                                });
                            }}>
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
        selectedUserNumber: state.serverReducer.contacts[state.serverReducer.selectedUserIndex].number,
        messages: state.serverReducer.messages,
        serverAddress: state.serverReducer.serverAddress,
        port: state.serverReducer.port,
        id: state.serverReducer.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectUser: (index) => dispatch(selectUser(index)),
        sendMessage: (msg, senderId, receiverId) => dispatch(sendMessage(msg, senderId, receiverId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen);