import { ACTIONS_DASHBOARD_WIDGET, DashboardWidgetSearchOrderTypeEnum } from "./types";
import { AppThunk } from "..";
import { GetDefaultHeaders, CheckStatus, ShowExceptionAsMessage, AddQueryStringsToUrl } from "../../utilities/ApiUtils";
import { Configuration } from "../../utilities/Constants";
import { PrepareBody, ShowError } from "../../utilities/Helpers";
import { IApiResponse } from "../../@types/Api";
import IDashboardWidget from "../../@types/DashboardWidget";
import { receivePayloads } from "../payload/actions";
import { incrementDailyExecutions } from "../widgetUserExecutionTracker/actions";

export const receiveDashboardWidgets = (dashboardWidgets: IDashboardWidget[]) => {

    var byIdObjectToDispatch: { [key: string]: IDashboardWidget } = {};

    for (var i = 0; i < dashboardWidgets.length; i++) {
        byIdObjectToDispatch[dashboardWidgets[i].dashboardWidgetId] = dashboardWidgets[i];
    }

    return {
        type: ACTIONS_DASHBOARD_WIDGET.RECEIVE,
        byId: byIdObjectToDispatch,
    }
};


export const requestDeleteDashboardWidget = (dashboardWidget: IDashboardWidget) => ({
    type: ACTIONS_DASHBOARD_WIDGET.DELETE,
    byId: { [dashboardWidget.dashboardWidgetId]: dashboardWidget }
});

export const requestDeletDashboardWidgetById = (dashboardWidgetId: string) => ({
    type: ACTIONS_DASHBOARD_WIDGET.DELETE,
    byId: { [dashboardWidgetId]: { dashboardWidgetId } }
})


export interface IFetchCreateDashboardWidgetProps {
    dashboardWidget: IDashboardWidget,
}


export const fetchCreateDashboardWidget = (createRequest: IFetchCreateDashboardWidgetProps): AppThunk<Promise<IDashboardWidget>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/dashboards/addWidget`, {
            method: 'POST',
            headers: headers,
            body: PrepareBody(createRequest?.dashboardWidget),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp?.success && parsedResp?.data?.dashboard) {

            if (parsedResp.data.dashboard.dashboardWidgets?.length) {
                dispatch(receiveDashboardWidgets(parsedResp.data.dashboard.dashboardWidgets));
            }

            return parsedResp.data.dashboard.dashboardWidgets;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error creating dashboard widget.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error creating dashboard widget.", e.stack);
        return;
    }
}


export interface IFetchUpdateDashboardWidgetProps {
    dashboardWidget: IDashboardWidget,
}


export const fetchUpdateDashboardWidget = (props: IFetchUpdateDashboardWidgetProps): AppThunk<Promise<IDashboardWidget>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/dashboardWidgets`, {
            method: 'PUT',
            headers: headers,
            body: PrepareBody(props),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.dashboardWidgets && parsedResp.data.dashboardWidgets.length) {
            dispatch(receiveDashboardWidgets(parsedResp.data.dashboardWidgets));
            return parsedResp.data.dashboardWidgets[0];
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error updating dashboard widget.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error updating dashboard widget.", e.stack);
        return;
    }
}


export interface IFetchDashboardWidgetProcessMessageProps {
    widgetId: string,
    dashboardWidgetId: string,
    payloads: { [key: string]: string },
}


export const fetchDashboardWidgetProcessMessage = (props: IFetchDashboardWidgetProcessMessageProps): AppThunk<Promise<IDashboardWidget>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/widgets/processMessage`, {
            method: 'POST',
            headers: headers,
            body: PrepareBody(props),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp?.success && parsedResp?.data?.payloadResponses) {
            dispatch(receivePayloads([{ ...parsedResp.data, dashboardWidgetId: props.dashboardWidgetId }]));
            dispatch(incrementDailyExecutions());
            return parsedResp.data;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error processing widget payload.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error processing widget payload.", e.stack);
        return;
    }
}


export interface IFetchSearchDashboardWidgetsProps {
    pageNumber: number,
    pageSize: number,
    dashboardWidgetId?: string,
    title?: string,
    content?: string,
    topicId?: string,
    tags?: string,
    createdBy?: string,
    orderType?: DashboardWidgetSearchOrderTypeEnum,
    postId?: string,
    parentId?: string,
    forceParentId?: boolean,
}


export interface IFetchRemoveDashboardWidgetProps {
    dashboardWidgetId: string,
    dashboardId: string,
}


export const fetchRemoveDashboardWidget = (props: IFetchRemoveDashboardWidgetProps): AppThunk<Promise<string | null>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(AddQueryStringsToUrl(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/dashboards/removewidget`, props), {
            method: 'DELETE',
            headers: headers
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp?.success) {
            dispatch(requestDeletDashboardWidgetById(props?.dashboardWidgetId));
            return props?.dashboardWidgetId;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error deleting dashboard widget.");
            }
        }

        return null;

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error deleting dashboard widget.", e.stack);
        return null;
    }
}