import { ACTIONS_DASHBOARD_WIDGET, DashboardWidgetSearchOrderTypeEnum } from "./types";
import { AppThunk } from "..";
import { GetDefaultHeaders, CheckStatus, ShowExceptionAsMessage, AddQueryStringsToUrl } from "../../utilities/ApiUtils";
import { Configuration } from "../../utilities/Constants";
import { PrepareBody, ShowError } from "../../utilities/Helpers";
import { IApiResponse } from "../../@types/Api";
import IDashboardWidget from "../../@types/DashboardWidget";

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


export interface IFetchCreateDashboardWidgetProps {
    dashboardWidget: IDashboardWidget,
}


export const fetchCreateDashboardWidget = (createRequest: IFetchCreateDashboardWidgetProps): AppThunk<Promise<IDashboardWidget>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/dashboardWidgets/create`, {
            method: 'POST',
            headers: headers,
            body: PrepareBody({ dashboardWidget: createRequest?.dashboardWidget }),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.dashboardWidgetId) {
            return parsedResp.data.dashboardWidgetId;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error creating dashboardWidget.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error creating dashboardWidget.", e.stack);
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
}


export const fetchRemoveDashboardWidget = (props: IFetchRemoveDashboardWidgetProps): AppThunk<Promise<IDashboardWidget>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(AddQueryStringsToUrl(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/dashboards/removewidget`, props), {
            method: 'DELETE',
            headers: headers
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.dashboardWidgets && parsedResp.data.dashboardWidgets.length) {
            dispatch(requestDeleteDashboardWidget(parsedResp.data.dashboardWidgets[0]));
            return parsedResp.data.dashboardWidgets[0];
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error deleting dashboardWidget.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error deleting dashboard widget.", e.stack);
        return;
    }
}