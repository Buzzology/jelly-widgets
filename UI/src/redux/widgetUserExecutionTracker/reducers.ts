import { ActionTypesWidgetUserExecutionTracker, WidgetUserExecutionTrackerState, ACTIONS_WIDGET_USER_EXECUTION_TRACKER } from "./types";

const initialState: WidgetUserExecutionTrackerState = {
    byId: {},
}


export function widgetUserExecutionTrackersReducer(
    state = initialState,
    action: ActionTypesWidgetUserExecutionTracker
): WidgetUserExecutionTrackerState {
    switch (action.type) {
        case ACTIONS_WIDGET_USER_EXECUTION_TRACKER.INVALIDATE: {
            return {
                ...initialState,
            }
        }
        case ACTIONS_WIDGET_USER_EXECUTION_TRACKER.DELETE: {
            let currentById = Object.assign({}, state.byId);
            delete currentById[Object.keys(action.byId)[0]];

            return {
                ...state,
                byId: currentById,
            }
        }

        case ACTIONS_WIDGET_USER_EXECUTION_TRACKER.RECEIVE: {
            return {
                ...state,
                byId: { ...state.byId, ...action.byId },
            }
        }

        case ACTIONS_WIDGET_USER_EXECUTION_TRACKER.INCREMENT_DAILY_EXECUTIONS: {
            let currentById = Object.assign({}, state.byId);
            for (const [key, value] of Object.entries(currentById)) {
                currentById[key] = { ...value, dailyExecutions: value.dailyExecutions + 1 };
            }

            return {
                ...state,
                byId: { ...state.byId, ...currentById },
            }
        }
        default:
            return state;
    }
}