import { RootState } from "..";
import IWidgetUserExecutionTracker from "../../@types/WidgetUserExecutionTracker";


export function selectorGetWidgetUserExecutionTrackers(state: RootState) : IWidgetUserExecutionTracker[] {
    
    if (!state.widgetUserExecutionTrackers || !state.widgetUserExecutionTrackers.byId) return [];

    return Object.values(state.widgetUserExecutionTrackers.byId);
}


export function selectorGetWidgetUserExecutionTrackerById(state: RootState, widgetUserExecutionTrackerId: string): IWidgetUserExecutionTracker | undefined {

    if (!state.widgetUserExecutionTrackers || !state.widgetUserExecutionTrackers.byId) return undefined;

    return state.widgetUserExecutionTrackers.byId[widgetUserExecutionTrackerId];
}


export function selectorGetWidgetUserExecutionTrackerByUserDetailId(state: RootState, userDetailId: string): IWidgetUserExecutionTracker | undefined {

    if (!state.widgetUserExecutionTrackers || !state.widgetUserExecutionTrackers.byId) return undefined;

    return Object.values(state.widgetUserExecutionTrackers.byId).find(x => x.userDetailId === userDetailId);
}