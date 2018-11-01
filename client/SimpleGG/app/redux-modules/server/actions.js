import {
    SET_SERVER_ADDRESS_AND_PORT,
    SET_RESPONSE,
    SET_CONTACTS,
    CONTACT_ADD,
    REGISTER_USER,
    USER_SELECTED
} from "./types";

export function setServerAddressAndPort(serverAddress, port) {
    return {
        type: SET_SERVER_ADDRESS_AND_PORT,
        serverAddress: serverAddress,
        port: port
    };
}

export function sendMessage(serverAddress, port, message) {
    console.log("in send message " + serverAddress + port + message);

    return async (dispatch) => {
        const net = require('react-native-tcp');
        const client = new net.Socket();

        console.log(net);
        console.log(client);

        client.connect(1234, '192.168.0.104', () => {
            console.log('CONNECTED to '+ '192.168.0.104 ' + 1234);
            client.write('1 2;');
        });

        client.on('error', function(error) {
            console.log(error)
        });

        client.on('data', (data) => {
            dispatch(setServerResponse(data.toString()));
            console.log(data.toString());
        });
    }
}

function setServerResponse(response){
    return {
        type: SET_RESPONSE,
        response: response
    }
}

export function addNewContact(contactNumber){
    return {
        type: CONTACT_ADD,
        contactNumber: contactNumber,
    };
}

export function setContacts(contacts) {
    return {
        type: SET_CONTACTS,
        contacts: contacts,
        port: port
    };
}

export function register(name){
    return {
        type: REGISTER_USER,
        name: name
    }
}

export function selectUser(index){
    return {
        type: USER_SELECTED,
        index: index
    }
}