import { IUserDetail } from "../../@types/UserDetail";
import { ACTIONS_USER_DETAIL } from "./types";
import { AppThunk } from "..";
import { GetDefaultHeaders, AddQueryStringsToUrl, CheckStatus, ShowExceptionAsMessage } from "../../utilities/ApiUtils";
import { Configuration } from "../../utilities/Constants";
import { PrepareBody } from "../../utilities/Helpers";


export const receiveUserDetails = (userDetails: IUserDetail[]) => {

    var byIdObjectToDispatch: { [key: string]: IUserDetail } = {};

    for (var i = 0; i < userDetails.length; i++) {
        byIdObjectToDispatch[userDetails[i].userDetailId] = userDetails[i];
    }

    return {
        type: ACTIONS_USER_DETAIL.RECEIVE,
        byId: byIdObjectToDispatch,
    }
};


export interface IFetchSearchUserDetails {
    userIds?: number[],
    pageSize?: number,
    pageNumber?: number,
    userDetailId?: string,
    text?: string,
}


export const fetchSearchUserDetails = ({ userIds = [], pageSize, pageNumber, userDetailId, text }: IFetchSearchUserDetails): AppThunk<Promise<IUserDetail[]>> => async dispatch => {

    var headers = GetDefaultHeaders(true, false, true);

    try {
        var apiResponse = await fetch(AddQueryStringsToUrl(`${Configuration.BASE_API_URL}/userDetails`, {
            userIds: userIds.join('_'),
            pageSize,
            pageNumber,
            userDetailId,
            text,
        }), {
            method: 'GET',
            headers: headers
        });

        // NOTE: Check status handles dispatching of generic types (userdetails, files, etc)
        return await CheckStatus(apiResponse);
    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error retrieving user details.", e.stack);

        return [];
    }
}


export const fetchValidateUser = (): AppThunk<Promise<IUserDetail[]>> => async dispatch => {

    var headers = GetDefaultHeaders(true, false, true);

    try {
        var apiResponse = await fetch(`${Configuration.BASE_CONTENT_MANAGEMENT_API_URL}/userPrep/validate`, {
            method: 'POST',
            headers: headers,
            body: PrepareBody({
                cb: new Date().getTime(),
            }),
        });

        // NOTE: Check status handles dispatching of generic types (userdetails, files, etc)
        return await CheckStatus(apiResponse);
    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error prepping user details.", e.stack);

        return [];
    }
}