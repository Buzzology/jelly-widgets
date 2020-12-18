import { MessageState, ActionTypesMessage, ACTIONS_MESSAGE } from "./types";


const initialState: MessageState = {
    byId: {},
}


export function messagesReducer(
    state = initialState,
    action: ActionTypesMessage
): MessageState {
    switch (action.type) {
        case ACTIONS_MESSAGE.RECEIVE: {
            return {
                ...state,
                byId: { ...state.byId, ...action.byId },
            }
        }
        case ACTIONS_MESSAGE.REQUEST_DELETE:

            let currentById = Object.assign({}, state.byId);
            delete currentById[Object.keys(action.byId)[0]];

            return {
                ...state,
                byId: currentById,
            }
        case ACTIONS_MESSAGE.INVALIDATE:
            return initialState
        default:
            return state;
    }
}