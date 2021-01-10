import { useMsal, useAccount } from "@azure/msal-react";
import { useEffect } from "react";
import { SetAccessToken } from "../../utilities/ApiUtils";


// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md#acquiring-an-access-token
export const usePrepareAccessTokenIfRequiredHook = () => {

    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    
    useEffect(() => {
        if (account) {

            instance.acquireTokenSilent({
                scopes: ["openid"],
                account: account
            }).then((response) => {
                if (response) {
                    SetAccessToken(response.idToken);
                }
            });
        }
    }, [account, instance]);
}