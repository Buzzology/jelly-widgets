import { ACTIONS_WIDGET_USER_EXECUTION_TRACKER } from "./types";
import { AppThunk } from "..";
import { GetDefaultHeaders, CheckStatus, ShowExceptionAsMessage } from "../../utilities/ApiUtils";
import { Configuration } from "../../utilities/Constants";
import { ShowError } from "../../utilities/Helpers";
import { IApiResponse } from "../../@types/Api";
import IWidgetUserExecutionTracker from "../../@types/WidgetUserExecutionTracker";

export const receiveWidgetUserExecutionTrackers = (widgetUserExecutionTrackers: IWidgetUserExecutionTracker[]) => {

    var byIdObjectToDispatch: { [key: string]: IWidgetUserExecutionTracker } = {};

    for (var i = 0; i < widgetUserExecutionTrackers.length; i++) {
        byIdObjectToDispatch[widgetUserExecutionTrackers[i].widgetUserExecutionTrackerId] = widgetUserExecutionTrackers[i];
    }

    return {
        type: ACTIONS_WIDGET_USER_EXECUTION_TRACKER.RECEIVE,
        byId: byIdObjectToDispatch,
    }
};


export const incrementDailyExecutions = () => {
    return {
        type: ACTIONS_WIDGET_USER_EXECUTION_TRACKER.INCREMENT_DAILY_EXECUTIONS
    }
}


export const requestDeleteWidgetUserExecutionTracker = (widgetUserExecutionTracker: IWidgetUserExecutionTracker) => ({
    type: ACTIONS_WIDGET_USER_EXECUTION_TRACKER.DELETE,
    byId: { [widgetUserExecutionTracker.widgetUserExecutionTrackerId]: widgetUserExecutionTracker }
});


export const fetchGetWidgetUserExecutionTracker = (): AppThunk<Promise<IWidgetUserExecutionTracker>> => async dispatch => {

    var headers = GetDefaultHeaders(true, false, false);

    try {
        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/widgetUserExecutionTrackers/get`, {
            method: 'GET',
            headers: headers
        });

        // NOTE: Check status handles dispatching of generic types (userdetails, files, etc)
        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp?.data?.widgetUserExecutionTracker) {
            dispatch(receiveWidgetUserExecutionTrackers([parsedResp.data.widgetUserExecutionTracker]))
            return parsedResp.data.widgetUserExecutionTracker;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error retrieving execution tracker.");
            }

            return null as unknown as IWidgetUserExecutionTracker;
        }
    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error retrieving execution tracker.", e.stack);
        return null as unknown as IWidgetUserExecutionTracker;
    }
}