import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal, useAccount } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { SetAccessToken } from "../../utilities/ApiUtils";


// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md#acquiring-an-access-token
export const usePrepareAccessTokenIfRequiredHook = () => {

    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (account) {
            setLoading(true);
            (async () => {
                try {
                    await instance.acquireTokenSilent({
                        scopes: ["openid"],
                        account: account,
                    }).then((response) => {
                        if (response) {
                            SetAccessToken(response.idToken);
                        }
                    });
                }
                catch (error) {
                    if (error instanceof InteractionRequiredAuthError) {
                        await instance.acquireTokenRedirect({
                            scopes: ["openid"]
                        });
                    }
                }
                finally {
                    setLoading(false);
                }
            })();
        }
    }, [account, instance]);

    return {
        loading,
    }
}