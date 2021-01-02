import { ActionTypesWidget, WidgetState, ACTIONS_WIDGET } from "./types";

const initialState: WidgetState = {
    byId: {},
}


export function widgetsReducer(
    state = initialState,
    action: ActionTypesWidget
): WidgetState {
    switch(action.type){
        case ACTIONS_WIDGET.INVALIDATE: {
            return {
                ...initialState,
            }
        }
        case ACTIONS_WIDGET.DELETE:

            let currentById = Object.assign({}, state.byId);
            delete currentById[Object.keys(action.byId)[0]];

            return {
                ...state,
                byId: currentById,
            }
        case ACTIONS_WIDGET.RECEIVE: {
            return {
                ...state,
                byId: { ...state.byId, ...action.byId },
            }
        }
        default:
            return state;
    }
}