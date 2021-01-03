import { ActionTypesPayload, PayloadState, ACTIONS_PAYLOAD } from "./types";

const initialState: PayloadState = {
    byId: {},
}


export function payloadsReducer(
    state = initialState,
    action: ActionTypesPayload
): PayloadState {
    switch(action.type){
        case ACTIONS_PAYLOAD.INVALIDATE: {
            return {
                ...initialState,
            }
        }
        case ACTIONS_PAYLOAD.DELETE:

            let currentById = Object.assign({}, state.byId);
            delete currentById[Object.keys(action.byId)[0]];

            return {
                ...state,
                byId: currentById,
            }
        case ACTIONS_PAYLOAD.RECEIVE: {
            return {
                ...state,
                byId: { ...state.byId, ...action.byId },
            }
        }
        default:
            return state;
    }
}