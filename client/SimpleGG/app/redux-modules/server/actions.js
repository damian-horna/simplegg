import {SET_SERVER_ADDRESS_AND_PORT, SET_RESPONSE} from "./types";

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