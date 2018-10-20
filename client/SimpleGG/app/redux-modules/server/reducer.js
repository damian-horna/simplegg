import {SET_RESPONSE, SET_SERVER_ADDRESS_AND_PORT} from "./types";

const initial = {
    serverAddress: '',
    port: '',
    response: ''
};

const serverReducer = (state = initial, action) => {
    switch (action.type) {
        case SET_SERVER_ADDRESS_AND_PORT: {
            return {...state, serverAddress: action.serverAddress, port: action.port};
        }
        case SET_RESPONSE: {
            return {...state, response: action.response};
        }
        default:
            return state;
    }
};

export default serverReducer;