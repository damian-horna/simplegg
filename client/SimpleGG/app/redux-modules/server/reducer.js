import {
    ADD_CONTACT,
    ADD_MESSAGE,
    REGISTER_USER,
    RESET_CONTACTS,
    SET_CONTACTS,
    SET_RESPONSE,
    SET_SERVER_ADDRESS_AND_PORT,
    SET_USER_ID,
    USER_SELECTED
} from "./types";

const initial = {
    id: '',
    serverAddress: '',
    port: '',
    response: '',
    contacts: [],
    userRegistered: false,
    userName: '',
    selectedUserIndex: 0,
    messages: []
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
        case REGISTER_USER: {
            return {...state, userRegistered: true, userName: action.name};
        }
        case USER_SELECTED: {
            return {...state, selectedUserIndex: action.index};
        }
        case SET_USER_ID: {
            return {...state, id: action.id};
        }
        case ADD_CONTACT: {
            let contactsCopy = state.contacts.slice();
            contactsCopy.push(action.contact);
            return {...state, contacts: contactsCopy};
        }
        case ADD_MESSAGE: {
            let messagesCopy = state.messages.slice();
            let newMsg = action.msg;
            if (action.msg.to === 'me') {
                console.log("if ok");
                newMsg.to = state.id;
                console.log("new msg is: " ,newMsg);
            }
            messagesCopy.unshift({...newMsg, key: state.messages.length});
            return {...state, messages: messagesCopy};
        }
        case RESET_CONTACTS: {
            return {...state, contacts: []}
        }
        default:
            return state;
    }
};

export default serverReducer;