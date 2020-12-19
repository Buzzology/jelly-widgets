import { ActionTypesDashboardWidget, DashboardWidgetState, ACTIONS_DASHBOARD_WIDGET } from "./types";

const initialState: DashboardWidgetState = {
    byId: {},
}


export function dashboardWidgetsReducer(
    state = initialState,
    action: ActionTypesDashboardWidget
): DashboardWidgetState {
    switch(action.type){
        case ACTIONS_DASHBOARD_WIDGET.INVALIDATE: {
            return {
                ...initialState,
            }
        }
        case ACTIONS_DASHBOARD_WIDGET.DELETE:

            let currentById = Object.assign({}, state.byId);
            delete currentById[Object.keys(action.byId)[0]];

            return {
                ...state,
                byId: currentById,
            }
        case ACTIONS_DASHBOARD_WIDGET.RECEIVE: {
            return {
                ...state,
                byId: { ...state.byId, ...action.byId },
            }
        }
        default:
            return state;
    }
}