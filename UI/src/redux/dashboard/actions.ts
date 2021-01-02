import { ACTIONS_DASHBOARD } from "./types";
import { AppThunk } from "..";
import { GetDefaultHeaders, CheckStatus, ShowExceptionAsMessage, AddQueryStringsToUrl } from "../../utilities/ApiUtils";
import { Configuration } from "../../utilities/Constants";
import { PrepareBody, ShowError } from "../../utilities/Helpers";
import { IApiResponse } from "../../@types/Api";
import IDashboard from "../../@types/Dashboard";
import { receiveDashboardWidgets } from "../dashboardWidget/actions";
import { selectorGetDashboardById } from "./selectors";

export const receiveDashboards = (dashboards: IDashboard[]) => {

    var byIdObjectToDispatch: { [key: string]: IDashboard } = {};

    for (var i = 0; i < dashboards.length; i++) {
        byIdObjectToDispatch[dashboards[i].dashboardId] = dashboards[i];
    }

    return {
        type: ACTIONS_DASHBOARD.RECEIVE,
        byId: byIdObjectToDispatch,
    }
};


export const requestDeleteDashboard = (dashboard: IDashboard) => ({
    type: ACTIONS_DASHBOARD.DELETE,
    byId: { [dashboard.dashboardId]: dashboard }
});


export interface IFetchCreateDashboardProps {
    content: string,
    postId: string,
    warning: boolean,
    parentId: string,
}


export const fetchCreateDashboard = (dashboardToCreate: IFetchCreateDashboardProps): AppThunk<Promise<IDashboard>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/dashboards/create`, {
            method: 'POST',
            headers: headers,
            body: PrepareBody({ dashboard: dashboardToCreate }),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.dashboard) {
            var dashboards = dispatchAndRemoveChildDashboardEntities(dispatch, [parsedResp.data.dashboard]);
            return dashboards?.length ? dashboards[0] : null as unknown as IDashboard;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error creating dashboard.");
            }

            return null as unknown as IDashboard;
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error creating dashboard.", e.stack);
        return null as unknown as IDashboard;
    }
}


export interface IFetchUpdateDashboardProps {
    dashboard: IDashboard,
}


export const fetchUpdateDashboard = (props: IFetchUpdateDashboardProps): AppThunk<Promise<IDashboard>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/dashboards`, {
            method: 'PUT',
            headers: headers,
            body: PrepareBody(props),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.dashboards && parsedResp.data.dashboards.length) {
            dispatch(receiveDashboards(parsedResp.data.dashboards));
            return parsedResp.data.dashboards[0];
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error updating dashboard.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error updating dashboard.", e.stack);
        return null;
    }
}


export interface IFetchSearchDashboardsProps {
    pageNumber: number,
    pageSize: number,
    dashboardId?: string,
    text?: string,
}


export const fetchSearchDashboards = (searchParams: IFetchSearchDashboardsProps): AppThunk<Promise<IDashboard[]>> => async dispatch => {

    var headers = GetDefaultHeaders(true, false, true);

    try {
        var apiResponse = await fetch(AddQueryStringsToUrl(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/dashboards/search`, searchParams), {
            method: 'GET',
            headers: headers
        });

        // NOTE: Check status handles dispatching of generic types (userdetails, files, etc)
        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.dashboards && parsedResp.data.dashboards) {
            return dispatchAndRemoveChildDashboardEntities(dispatch, parsedResp.data.dashboards);
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error searching dashboard.");
            }

            return [];
        }
    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error searching dashboard.", e.stack);
        return [];
    }
}


export interface IFetchGetDashboardsProps {
    dashboardId: string,
}


export const fetchGetDashboard = (params: IFetchGetDashboardsProps): AppThunk<Promise<IDashboard>> => async dispatch => {

    var headers = GetDefaultHeaders(true, false, true);

    try {
        var apiResponse = await fetch(AddQueryStringsToUrl(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/dashboards/get`, params), {
            method: 'GET',
            headers: headers
        });

        // NOTE: Check status handles dispatching of generic types (userdetails, files, etc)
        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.dashboard) {
            var dashboards = dispatchAndRemoveChildDashboardEntities(dispatch, [parsedResp.data.dashboard]);
            return dashboards?.length ? dashboards[0] : null as unknown as IDashboard;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error retrieving dashboard.");
            }

            return null as unknown as IDashboard;
        }
    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error retrieving dashboard.", e.stack);
        return null as unknown as IDashboard;
    }
}


export interface IFetchDeleteDashboardProps {
    dashboardId: string,
}


export const fetchDeleteDashboard = (props: IFetchDeleteDashboardProps): AppThunk<Promise<IDashboard>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(AddQueryStringsToUrl(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/dashboards`, props), {
            method: 'DELETE',
            headers: headers
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.dashboards && parsedResp.data.dashboards.length) {
            dispatch(requestDeleteDashboard(parsedResp.data.dashboards[0]));
            return parsedResp.data.dashboards[0];
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error deleting dashboard.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error deleting dashboard.", e.stack);
        return;
    }
}


function dispatchAndRemoveChildDashboardEntities(dispatch: any, dashboards: IDashboard[]) {

    // Normalise child entities on dashboard
    for (var dashboard of dashboards) {

        if (dashboard.dashboardWidgets?.length) {
            dispatch(receiveDashboardWidgets(dashboard.dashboardWidgets));
        }

        delete dashboard.dashboardWidgets;                
    }

    // Add dashboards to store
    dispatch(receiveDashboards(dashboards));

    return dashboards;
}


export const fetchDashboardByIdIfNeeded = (dashboardId: string): AppThunk<Promise<void>> => async (dispatch, getState) => {

    if (!selectorGetDashboardById(getState(), dashboardId)) {
        await dispatch(fetchSearchDashboards({ dashboardId, pageNumber: 1, pageSize: 1 }));
    }

    return;
}