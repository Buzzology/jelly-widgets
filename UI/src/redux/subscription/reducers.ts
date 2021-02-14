import { ActionTypesSubscription, SubscriptionState, ACTIONS_SUBSCRIPTION } from "./types";

const initialState: SubscriptionState = {
    byId: {},
}


export function subscriptionsReducer(
    state = initialState,
    action: ActionTypesSubscription
): SubscriptionState {
    switch(action.type){
        case ACTIONS_SUBSCRIPTION.INVALIDATE: {
            return {
                ...initialState,
            }
        }
        case ACTIONS_SUBSCRIPTION.DELETE:

            let currentById = Object.assign({}, state.byId);
            delete currentById[Object.keys(action.byId)[0]];

            return {
                ...state,
                byId: currentById,
            }
        case ACTIONS_SUBSCRIPTION.RECEIVE: {
            return {
                ...state,
                byId: { ...state.byId, ...action.byId },
            }
        }
        default:
            return state;
    }
}