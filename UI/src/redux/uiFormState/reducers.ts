import { ActionTypesUiFormState, UiFormStateState, ACTIONS_UI_FORM_STATE } from "./types";


const initialState: UiFormStateState = {
    byId: {},
}


export function uiFormStatesReducer(
    state = initialState,
    action: ActionTypesUiFormState
): UiFormStateState {
    switch(action.type){

        case ACTIONS_UI_FORM_STATE.INVALIDATE: {
            return {
                ...initialState,
            }
        }

        case ACTIONS_UI_FORM_STATE.RECEIVE: {
            return {
                ...state,
                byId: { ...state.byId, ...action.byId },
            }
        }
        default:
            return state;
    }
}