import {SET_RESPONSE, SET_SERVER_ADDRESS_AND_PORT} from "./types";
import {SET_CONTACTS} from "../contacts/types";

const initial = {
    serverAddress: '',
    port: '',
    response: '',
    contacts: [{number: 1, name: 'Jan Kowalski'}, {number: 2, name: 'Tomasz Wicher'}, {number: 3, name: 'Wicher Tomasz'}]
};

const serverReducer = (state = initial, action) => {
    switch (action.type) {
        case SET_SERVER_ADDRESS_AND_PORT: {
            return {...state, serverAddress: action.serverAddress, port: action.port};
        }
        case SET_RESPONSE: {
            return {...state, response: action.response};
        }
        case SET_CONTACTS: {
            return {...state, serverAddress: action.serverAddress, port: action.port};
        }
        default:
            return state;
    }
};

export default serverReducer;