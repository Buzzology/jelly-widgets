import { ACTIONS_SUBSCRIPTION } from "./types";
import { AppThunk } from "..";
import { GetDefaultHeaders, CheckStatus, ShowExceptionAsMessage, AddQueryStringsToUrl } from "../../utilities/ApiUtils";
import { Configuration } from "../../utilities/Constants";
import { PrepareBody, ShowError } from "../../utilities/Helpers";
import { IApiResponse } from "../../@types/Api";
import { selectorGetSubscriptionById } from "./selectors";
import ISubscription from "../../@types/Subscription";


export const receiveSubscriptions = (subscriptions: ISubscription[]) => {

    var byIdObjectToDispatch: { [key: string]: ISubscription } = {};

    for (var i = 0; i < subscriptions.length; i++) {
        byIdObjectToDispatch[subscriptions[i].subscriptionId] = subscriptions[i];
    }

    return {
        type: ACTIONS_SUBSCRIPTION.RECEIVE,
        byId: byIdObjectToDispatch,
    }
};


export const requestDeleteSubscription = (subscription: ISubscription) => ({
    type: ACTIONS_SUBSCRIPTION.DELETE,
    byId: { [subscription.subscriptionId]: subscription }
});


export interface IFetchCreateSubscriptionProps {
    name: string,
    description: string,
}


export const fetchCreateSubscription = (subscriptionToCreate: IFetchCreateSubscriptionProps): AppThunk<Promise<string>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_SUBSCRIPTION_MANAGEMENT_API_URL}/subscriptions/create`, {
            method: 'POST',
            headers: headers,
            body: PrepareBody({ subscription: subscriptionToCreate }),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.subscriptionId) {
            return parsedResp.data.subscriptionId;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error creating subscription.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error creating subscription.", e.stack);
        return;
    }
}


export const fetchSubscriptionByIdIfNeeded = (subscriptionId: string): AppThunk<Promise<void>> => async (dispatch, getState) => {

    if (!selectorGetSubscriptionById(getState(), subscriptionId)) {
        await dispatch(fetchSearchSubscriptions({ subscriptionId, pageNumber: 1, pageSize: 1 }));
    }

    return;
}


export interface IFetchUpdateSubscriptionProps {
    subscription: ISubscription,
}


export const fetchUpdateSubscription = (props: IFetchUpdateSubscriptionProps): AppThunk<Promise<string>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_SUBSCRIPTION_MANAGEMENT_API_URL}/subscriptions/update`, {
            method: 'PUT',
            headers: headers,
            body:PrepareBody({ subscription: props }),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.subscriptionId) {
            return parsedResp.data.subscriptionId;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error updating subscription.");
                return null;
            }
        }
    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error updating subscription.", e.stack);
        return;
    }
}


export interface IFetchSearchSubscriptionsProps {
    pageNumber: number,
    pageSize: number,
    subscriptionId?: string,
    active?: boolean,
}


export const fetchSearchSubscriptions = (searchParams: IFetchSearchSubscriptionsProps): AppThunk<Promise<ISubscription[]>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true, false);

    try {
        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_SUBSCRIPTION_MANAGEMENT_API_URL}/subscriptions/search`, {
            method: 'POST',
            headers: headers,
            body:PrepareBody({ searchParams }),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp?.success && parsedResp?.data?.subscriptions) {
            dispatch(receiveSubscriptions(parsedResp.data.subscriptions));
            return parsedResp.data.subscriptions;
        }
        else {
            if (!parsedResp?.messages?.length) {
                ShowError("Error searching subscription.");
            }

            return [];
        }
    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error searching subscription.", e.stack);
        return [];
    }
}


export interface IFetchDeleteSubscriptionProps {
    subscriptionId: string,
}


export const fetchDeleteSubscription = (props: IFetchDeleteSubscriptionProps): AppThunk<Promise<string>> => async dispatch => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(AddQueryStringsToUrl(`${Configuration.REACT_APP_BASE_SUBSCRIPTION_MANAGEMENT_API_URL}/subscriptions`, props), {
            method: 'DELETE',
            headers: headers
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.subscriptions && parsedResp.data.subscriptions.length) {
            dispatch(requestDeleteSubscription(parsedResp.data.subscriptions[0]));
            return parsedResp.data.subscriptions[0];
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error deleting subscription.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error deleting subscription.", e.stack);
        return;
    }
}