import {SET_CONTACTS} from "./types";

export function setContacts(contacts) {
    return {
        type: SET_CONTACTS,
        contacts: contacts,
        port: port
    };
}