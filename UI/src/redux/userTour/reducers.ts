import { ActionTypesUserTour, UserTourState, ACTIONS_USER_TOUR } from "./types";

const initialState: UserTourState = {
    byId: {},
}


export function userToursReducer(
    state = initialState,
    action: ActionTypesUserTour
): UserTourState {
    switch(action.type){
        case ACTIONS_USER_TOUR.INVALIDATE: {
            return {
                ...initialState,
            }
        }
        case ACTIONS_USER_TOUR.DELETE:

            let currentById = Object.assign({}, state.byId);
            delete currentById[Object.keys(action.byId)[0]];

            return {
                ...state,
                byId: currentById,
            }
        case ACTIONS_USER_TOUR.RECEIVE: {
            return {
                ...state,
                byId: { ...state.byId, ...action.byId },
            }
        }
        default:
            return state;
    }
}