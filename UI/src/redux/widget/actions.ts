import { ACTIONS_WIDGET, WidgetSearchOrderTypeEnum } from "./types";
import { AppThunk } from "..";
import { GetDefaultHeaders, CheckStatus, ShowExceptionAsMessage, AddQueryStringsToUrl } from "../../utilities/ApiUtils";
import { Configuration } from "../../utilities/Constants";
import { PrepareBody, ShowError } from "../../utilities/Helpers";
import { IApiResponse } from "../../@types/Api";
import { selectorGetWidgetById } from "./selectors";
import IWidget from "../../@types/Widget";


export const receiveWidgets = (widgets: IWidget[]) => {

    var byIdObjectToDispatch: { [key: string]: IWidget } = {};

    for (var i = 0; i < widgets.length; i++) {
        byIdObjectToDispatch[widgets[i].widgetId] = widgets[i];
    }

    return {
        type: ACTIONS_WIDGET.RECEIVE,
        byId: byIdObjectToDispatch,
    }
};


export const requestDeleteWidget = (widget: IWidget) => ({
    type: ACTIONS_WIDGET.DELETE,
    byId: { [widget.widgetId]: widget }
});


export interface IFetchCreateWidgetProps {
    name: string,
    description: string,
}


export const fetchCreateWidget = (widgetToCreate: IFetchCreateWidgetProps): AppThunk<Promise<string>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/widgets/create`, {
            method: 'POST',
            headers: headers,
            body: PrepareBody({ widget: widgetToCreate }),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.widgetId) {
            return parsedResp.data.widgetId;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error creating widget.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error creating widget.", e.stack);
        return;
    }
}


export const fetchWidgetByIdIfNeeded = (widgetId: string): AppThunk<Promise<void>> => async (dispatch, getState) => {

    if (!selectorGetWidgetById(getState(), widgetId)) {
        await dispatch(fetchSearchWidgets({ widgetId, pageNumber: 1, pageSize: 1 }));
    }

    return;
}


export interface IFetchUpdateWidgetProps {
    widget: IWidget,
}


export const fetchUpdateWidget = (props: IFetchUpdateWidgetProps): AppThunk<Promise<string>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/widgets/update`, {
            method: 'PUT',
            headers: headers,
            body:PrepareBody({ widget: props }),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.widgetId) {
            return parsedResp.data.widgetId;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error updating widget.");
                return null;
            }
        }
    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error updating widget.", e.stack);
        return;
    }
}


export interface IFetchSearchWidgetsProps {
    pageNumber: number,
    pageSize: number,
    widgetId?: string,
    text?: string,
    createdBy?: string,
    orderType?: WidgetSearchOrderTypeEnum,
}


export const fetchSearchWidgets = (searchParams: IFetchSearchWidgetsProps): AppThunk<Promise<IWidget[]>> => async dispatch => {

    var headers = GetDefaultHeaders(true, false, true);

    try {

        var apiResponse = await fetch(AddQueryStringsToUrl(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/widgets/search`, searchParams), {
            method: 'GET',
            headers: headers
        });

        // NOTE: Check status handles dispatching of generic types (userdetails, files, etc)
        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp?.success && parsedResp?.data?.widgets) {
            dispatch(receiveWidgets(parsedResp.data.widgets));
            return parsedResp.data.widgets;
        }
        else {
            if (!parsedResp?.messages?.length) {
                ShowError("Error searching widget.");
            }

            return [];
        }
    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error searching widget.", e.stack);
        return [];
    }
}


export interface IFetchDeleteWidgetProps {
    widgetId: string,
}


export const fetchDeleteWidget = (props: IFetchDeleteWidgetProps): AppThunk<Promise<string>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(AddQueryStringsToUrl(`${Configuration.REACT_APP_BASE_WIDGET_MANAGEMENT_API_URL}/widgets`, props), {
            method: 'DELETE',
            headers: headers
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.widgets && parsedResp.data.widgets.length) {
            dispatch(requestDeleteWidget(parsedResp.data.widgets[0]));
            return parsedResp.data.widgets[0];
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error deleting widget.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error deleting widget.", e.stack);
        return;
    }
}