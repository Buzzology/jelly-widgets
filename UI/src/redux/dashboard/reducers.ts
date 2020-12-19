import { ActionTypesDashboard, DashboardState, ACTIONS_DASHBOARD } from "./types";

const initialState: DashboardState = {
    byId: {},
}


export function dashboardsReducer(
    state = initialState,
    action: ActionTypesDashboard
): DashboardState {
    switch(action.type){
        case ACTIONS_DASHBOARD.INVALIDATE: {
            return {
                ...initialState,
            }
        }
        case ACTIONS_DASHBOARD.DELETE:

            let currentById = Object.assign({}, state.byId);
            delete currentById[Object.keys(action.byId)[0]];

            return {
                ...state,
                byId: currentById,
            }
        case ACTIONS_DASHBOARD.RECEIVE: {
            return {
                ...state,
                byId: { ...state.byId, ...action.byId },
            }
        }
        default:
            return state;
    }
}