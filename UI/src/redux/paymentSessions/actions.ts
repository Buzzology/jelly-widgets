import { IApiResponse } from "../../@types/Api";
import { CheckStatus, GetDefaultHeaders, ShowExceptionAsMessage } from "../../utilities/ApiUtils";
import { Configuration } from "../../utilities/Constants";
import { PrepareBody, ShowError } from "../../utilities/Helpers";

export const fetchAccountManagementPortalUrl = async () => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_SUBSCRIPTION_MANAGEMENT_API_URL}/StripeRedirects/AccountManagementPortal`, {
            method: 'POST',
            headers: headers,
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp?.success && parsedResp?.data?.redirectUrl) {
            window.location = parsedResp?.data?.redirectUrl;
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error redirecting to payment window.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error redirecting to payment window.", e.stack);
        return;
    }
}


export interface IFetchCheckoutPortalUrlProps {
    lineItems: LineItemDto[],
}

export type LineItemDto = {
    priceId: string,
    quantity: number
}


export const fetchCheckoutPortalSessionId = async (props: IFetchCheckoutPortalUrlProps) => {

    var headers = GetDefaultHeaders(true, true);

    try {

        var apiResponse = await fetch(`${Configuration.REACT_APP_BASE_SUBSCRIPTION_MANAGEMENT_API_URL}/StripeRedirects/CheckoutPortal`, {
            method: 'POST',
            headers: headers,
            body: PrepareBody(props?.lineItems),
        });

        var parsedResp: IApiResponse = await CheckStatus(apiResponse);
        if (parsedResp?.success && parsedResp?.data?.sessionId) {
            return parsedResp?.data?.sessionId
        }
        else {
            if (!parsedResp || !parsedResp.messages || !parsedResp.messages.length) {
                ShowError("Error redirecting to payment window.");
                return null;
            }
        }

    }
    catch (e) {
        ShowExceptionAsMessage(e);
        console.log("Error redirecting to payment window.", e.stack);
        return;
    }
}