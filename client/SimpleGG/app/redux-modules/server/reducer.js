import {
    CONTACT_ADD,
    SET_RESPONSE,
    SET_SERVER_ADDRESS_AND_PORT,
    SET_CONTACTS,
    REGISTER_USER,
    USER_SELECTED
} from "./types";

const initial = {
    serverAddress: '',
    port: '',
    response: '',
    contacts: [{number: 1, name: 'Jan Kowalski'}, {number: 2, name: 'Tomasz Wicher'}, {number: 3, name: 'Wicher Tomasz'}],
    userRegistered: false,
    userName: '',
    selectedUserIndex: 0,
    messages: [{content: 'Well, I\'m fine. What about you?' , sendByMe: false}, {content: 'Hello John, what\'s up?', sendByMe: true}]
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
        case CONTACT_ADD: {
            let contactsCopy = state.contacts.slice();
            contactsCopy.push({number: action.contactNumber, name: 'Test'});
            return {...state, contacts: contactsCopy};
        }
        case REGISTER_USER: {
            return {...state, userRegistered: true, userName: action.name};
        }
        case USER_SELECTED: {
            return {...state, selectedUserIndex: action.index};
        }
        default:
            return state;
    }
};

export default serverReducer;