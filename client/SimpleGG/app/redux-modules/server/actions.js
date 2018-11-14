import {
    ADD_CONTACT, ADD_MESSAGE, RESET_CONTACTS,
    SET_CONTACTS,
    SET_RESPONSE,
    SET_SERVER_ADDRESS_AND_PORT,
    SET_USER_ID,
    USER_SELECTED
} from "./types";

const net = require('react-native-tcp');
let client;

export function setServerAddressAndPort(serverAddress, port) {
    return {
        type: SET_SERVER_ADDRESS_AND_PORT,
        serverAddress: serverAddress,
        port: port
    };
}

export function connectToServer(serverAddress, port) {
    return async (dispatch) => {
        client = new net.Socket();
        client.connect(port, serverAddress, () => {
            console.log('connection success')
        });

        client.on('error', function (error) {
            console.log('logged error: ' + error)
        });

        client.on('data', (data) => {
            console.log('data is: ' + data.toString());
            console.log(data.toString());

            if (data.toString().charAt(0) === 'r') {
                console.log('id is; ' + data.toString().substring(2,6).trim());
                dispatch(setUserId(data.toString().substring(2,6).trim()));
            }

            if(data.toString().charAt(0) === 'c'){
                let message  = data.toString().trim();
                let splitted = message.split(",");
                console.log(splitted);
                dispatch(addToContacts({name: splitted[2], number: splitted[1]}));
            }

            if(data.toString().charAt(0) === 'd'){
                console.log('message received: ' + data.toString().trim());
                let message  = data.toString().trim();
                let from = message.substring(2, 5);
                let msgContent = message.substring(6);
                console.log('message content: ' + msgContent);
                dispatch(addMessage({from: from, content: msgContent, sendByMe: false}));
            }
        });
    }
}

export function addToContacts(contact){
    return {
        type: ADD_CONTACT,
        contact: contact
    };
}

export function addMessage(msg){
    return {
        type: ADD_MESSAGE,
        msg: msg
    };
}

export function sendMessage(message, senderId, receiverId) {
    return async (dispatch) => {
        console.log('receiver: ', 'aa: ' + receiverId);
        console.log('sender: ', 'aa: ' + senderId );
        console.log('message: ', 'aa: ' + message);
        console.log('sending message : '+ 'd ' + senderId.trim() + ' ' + receiverId + ' ' + message);
        client.write('d ' + senderId.trim() + ' ' + receiverId + ' ' + message);
        dispatch(addMessage({from: senderId.toString(), content: message, sendByMe: true}))
    }
}

function setServerResponse(response) {
    return {
        type: SET_RESPONSE,
        response: response
    }
}

export function setContacts(contacts) {
    return {
        type: SET_CONTACTS,
        contacts: contacts,
        port: port
    };
}

export function register(name) {
    return async (dispatch) => {
        client.write("r " + name.toString());
    }
}

export function retrieveContacts() {
    return async (dispatch) => {
        client.write("c");
    }
}

export function selectUser(index) {
    return {
        type: USER_SELECTED,
        index: index
    }
}

export function resetContacts(){
    return {
        type: RESET_CONTACTS
    }
}

export function setUserId(id) {
    return {
        type: SET_USER_ID,
        id: id
    }
}
