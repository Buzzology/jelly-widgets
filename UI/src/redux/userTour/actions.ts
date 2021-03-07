import { ACTIONS_USER_TOUR } from './types';
import { AppThunk } from '..';
import { Configuration } from '../../utilities/Constants';
import { GetDefaultHeaders, CheckStatus, ShowExceptionAsMessage, AddQueryStringsToUrl } from '../../utilities/ApiUtils';
import { PrepareBody, ShowError } from '../../utilities/Helpers';
import { IApiResponse } from '../../@types/Api';
import { IUserTour } from '../../@types/UserTour';


export const receiveUserTours = (userTours: IUserTour[]) => {

    var byIdObjectToDispatch: { [key: string]: IUserTour } = {};

    for (var i = 0; i < userTours.length; i++) {
        byIdObjectToDispatch[userTours[i].userTourId] = userTours[i];
    }

    return {
        type: ACTIONS_USER_TOUR.RECEIVE,
        byId: byIdObjectToDispatch,
    }
};


export interface IFetchDismissUserTourProps {
    tourId: string,
}


export const fetchDismissUserTour = (userTourToDismiss: IFetchDismissUserTourProps): AppThunk<Promise<IUserTour>> => async dispatch => {

    var headers = await GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_USER_MANAGEMENT_API_URL}/userTours/dismiss`, {
            method: 'POST',
            headers: headers,
            body: PrepareBody(userTourToDismiss),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.userTour) {
            dispatch(receiveUserTours([parsedResp.data.userTour]));
            return parsedResp.data.userTour;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Failed to dismiss user tour.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Failed to dismiss user tour.", e.stack);
        return;
    }
}


export interface IFetchSearchUserToursProps {
    pageNumber: number,
    pageSize: number,
    userTourId?: string,
    userId?: string,
}


export const fetchSearchUserTours = (searchParams: IFetchSearchUserToursProps): AppThunk<Promise<IUserTour[]>> => async dispatch => {

    var headers = await GetDefaultHeaders(true, false, true);

    try {
        var apiResponse = await fetch(AddQueryStringsToUrl(`${Configuration.REACT_APP_BASE_USER_MANAGEMENT_API_URL}/userTours`, searchParams), {
            method: 'GET',
            headers: headers
        });

        // NOTE: Check status handles dispatching of generic types (userdetails, files, etc)
        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp && parsedResp.success && parsedResp.data && parsedResp.data.userTours) {

            // Remove unmapped image property
            for (var userTour of parsedResp.data.userTours) {
                delete userTour.mainImage;
            }

            dispatch(receiveUserTours(parsedResp.data.userTours));
            return parsedResp.data.userTours;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error searching userTour.");
                return [];
            }
        }
    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error searching userTour.", e.stack);
        return [];
    }
}