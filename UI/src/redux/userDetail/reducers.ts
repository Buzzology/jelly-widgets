import { ActionTypesUserDetail, UserDetailState, ACTIONS_USER_DETAIL } from "./types";

const initialState: UserDetailState = {
    byId: {},
}


export function userDetailsReducer(
    state = initialState,
    action: ActionTypesUserDetail
): UserDetailState {
    switch(action.type){
        case ACTIONS_USER_DETAIL.INVALIDATE: {
            return {
                ...initialState,
            }
        }
        case ACTIONS_USER_DETAIL.RECEIVE: {
            return {
                ...state,
                byId: { ...state.byId, ...action.byId },
            }
        }
        default:
            return state;
    }
}