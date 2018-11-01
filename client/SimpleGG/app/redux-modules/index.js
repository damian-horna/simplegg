import {combineReducers} from "redux";
import serverReducer from "./server/reducer";

const rootReducer = combineReducers({
    serverReducer: serverReducer,
});

export default rootReducer;