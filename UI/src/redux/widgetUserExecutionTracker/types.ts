import IWidgetUserExecutionTracker from "../../@types/WidgetUserExecutionTracker";

export const ACTIONS_WIDGET_USER_EXECUTION_TRACKER = {
    INVALIDATE: 'INVALIDATE_WIDGET_USER_EXECUTION_TRACKERS',
    RECEIVE: 'RECEIVE_WIDGET_USER_EXECUTION_TRACKERS',
    DELETE: 'DELETE_WIDGET_USER_EXECUTION_TRACKER',
    UPDATE: 'UPDATE_WIDGET_USER_EXECUTION_TRACKERS',
    INCREMENT_DAILY_EXECUTIONS: 'INCREMENT_DAILY_EXECUTIONS_WIDGET_USER_EXECUTION_TRACKER',
}

interface ActionWidgetUserExecutionTrackersInvalidate {
    type: typeof ACTIONS_WIDGET_USER_EXECUTION_TRACKER.INVALIDATE,
    byId: { [key: string]: IWidgetUserExecutionTracker },
}

interface ActionWidgetUserExecutionTrackersReceive {
    type: typeof ACTIONS_WIDGET_USER_EXECUTION_TRACKER.RECEIVE
    byId: { [key: string]: IWidgetUserExecutionTracker },
}

export interface WidgetUserExecutionTrackerState {
    byId: { [key: string]: IWidgetUserExecutionTracker },
}

export enum WidgetUserExecutionTrackerSearchOrderTypeEnum {
    CreatedDateDesc = 10,
    CreatedDateAsc = 20,
}

export type ActionTypesWidgetUserExecutionTracker = ActionWidgetUserExecutionTrackersReceive | ActionWidgetUserExecutionTrackersInvalidate;