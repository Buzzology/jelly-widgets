import { SetLocalStorageItem, GetLocalStorageItem, SetDomainSharedCookie, ShowMessage, GetCookieValue } from "./Helpers";
import { StorageKeys, MessageTypes } from "./Constants";
import { IApiResponse } from "../@types/Api";
import IMessage from "../@types/Message";
import { GetLoginUrl } from "../routes/RouteLinkHelpers";
import { receiveUserDetails } from "../redux/userDetail/actions";
import store from "../redux";


export const SetUsername = (username: string) => {
    return SetLocalStorageItem(StorageKeys.USERNAME, username);
}

export const GetUsername = function () {
    return GetLocalStorageItem(StorageKeys.USERNAME);
}

export const SetAccessToken = (accessToken: string) => {
    return SetDomainSharedCookie(StorageKeys.ACCESS_TOKEN, accessToken);
}


export const SetAuthExpiresAt = (expiresAt: number) => {
    return SetDomainSharedCookie(StorageKeys.EXPIRES_AT, String(expiresAt));
}


/* Show an exception as an error message */
export const ShowExceptionAsMessage = (e: ExceptionInformation) => {

    if (e) {
        console.error(e);
    }

    return ShowMessage("An error has occurred.", MessageTypes.ERROR);
}


/* Retrieve the current user's id */
export const GetUserId = function () {
    return GetLocalStorageItem(StorageKeys.USER_ID);
}


/* Clears all local storage etc */
export const Logout = () => {
    EraseCookie(StorageKeys.ACCESS_TOKEN);
    EraseCookie(StorageKeys.EXPIRES_AT);
    EraseCookie(StorageKeys.USER_ID);
    DeleteLocalStorageItem(StorageKeys.USERNAME);
    DeleteLocalStorageItem(StorageKeys.EXPIRES_AT);
    DeleteLocalStorageItem(StorageKeys.USER_ID);
    DeleteLocalStorageItem(StorageKeys.ACCESS_TOKEN);
    localStorage.clear();
    sessionStorage.clear();
}


/* https://stackoverflow.com/a/5886746/522859 */
export const EraseCookie = (name: string) => {

    console.log("Erasing")

    // This function will attempt to remove a cookie from all paths.
    var pathBits = window.location.pathname.split('/');
    var pathCurrent = ' path=';

    // Do a simple pathless delete first.
    document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';

    for (var i = 0; i < pathBits.length; i++) {
        pathCurrent += ((pathCurrent.substr(-1) !== '/') ? '/' : '') + pathBits[i];
        document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
    }
}


export const DeleteLocalStorageItem = (key: string) => {
    localStorage.removeItem(key);
}


/* Processes the response and updates/displays messages if required */
export const CheckStatus = async (response: any) => {

    // Ensure that the user's session hasn't expired
    if (response && response.status === 401) {

        ShowMessage("Please login.", MessageTypes.WARNING);
        window.location.replace(GetLoginUrl());
        return response;
    }

    // If there are no headers return the resp
    if (!response.headers) {
        return response;
    }

    // Just return the response if there's no value to parse
    var contentType = response.headers.get("content-type");
    if (!contentType || contentType.indexOf("application/json") === -1) {
        return response;
    }

    // This is a json response so we can parse any messages that we receive
    var data: IApiResponse = await response.json();

    // Hydrate files if provided
    if (data && data.data && data.data.files && data.data.files.length) {
        // store.dispatch(receiveFiles(data.data.files as IFile[]));
    }

    // Hydrate user details if provided
    if (data && data.data && data.data.userDetails && data.data.userDetails.length) {
        store.dispatch(receiveUserDetails(data.data.userDetails));
    }

    // Handle messages if provided
    if (data && data.messages && data.messages.length && data.messages.length > 0) {

        data.messages.forEach((message: IMessage) => {

            switch (message.type) {
                case 0:
                    ShowMessage(message.text, MessageTypes.ERROR);
                    break;

                case 1:
                    ShowMessage(message.text, MessageTypes.SUCCESS);
                    break;

                case 2:
                    ShowMessage(message.text, MessageTypes.INFORMATION);
                    break;

                case 3:
                    ShowMessage(message.text, MessageTypes.WARNING);
                    break;

                default:
                    ShowMessage(message.text, MessageTypes.INFORMATION);
                    console.error("Unexpected message type.");
                    break;
            }
        });
    }

    // Set user details if provided
    if (data.userId) SetUserId(data.userId);
    if (data && data.nickname) SetUsername(data.username);
    if (data && data.username) SetUsername(data.username);

    // Resolve and return data
    return data;
}


/* Sets the current user's id */
export const SetUserId = (userId: string) => {
    return SetLocalStorageItem(StorageKeys.USER_ID, userId);
}


/* Get default headers for requests */
export const GetDefaultHeaders = (includeAuth = true, includeJsonContentType = true, includeTextContentType = false) => {

    var headers = new Headers();

    if (includeAuth) {
        headers.append("Authorization", "Bearer " + GetAccessToken());
    }

    if (includeJsonContentType) {
        headers.append("Content-Type", "application/json");
    }

    if (includeTextContentType) {
        headers.append("Content-Type", "text/plain");
    }

    return headers;
}


/* Retrieves the user's access token */
export const GetAccessToken = function () {
    return GetCookieValue(StorageKeys.ACCESS_TOKEN);
}


/* Add gets params to a url */
export const AddQueryStringsToUrl = (url: string, params: { [key: string]: any }) => {

    if (!params) return url;

    let concatenatorTouse = "?";
    for (var key of Object.keys(params)) {

        let value = params[key];

        // Ensure that the key has a value
        if (params[key] && value && value !== 'undefined') {
            url += `${concatenatorTouse}${key}=${value}`;
            concatenatorTouse = "&";
        }
    }

    return url;
}