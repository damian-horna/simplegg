import {TOGGLE_ACTIVE} from "./types";

const initialHelpState = {
    currentScreen: 'Welcome'
};

const menuReducer = (state = initialHelpState, action) => {
    switch (action.type) {
        case TOGGLE_ACTIVE: {
            return {...state, currentScreen: action.currentScreen};
        }
        default:
            return state;
    }
};

export default menuReducer;