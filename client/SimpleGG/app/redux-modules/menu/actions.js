import {TOGGLE_ACTIVE} from "./types";

export function setActiveScreen(currentScreen) {
    return {
        type: TOGGLE_ACTIVE,
        currentScreen
    };
}