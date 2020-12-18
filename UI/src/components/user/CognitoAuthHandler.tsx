import React from 'react'
import { Paper, Grid, Container, CardContent, Typography } from '@material-ui/core';
import LoaderPlaceholder from '../generic/loaders/LoaderPlaceholder';
import { useLocation } from 'react-router-dom';
import { Configuration } from '../../utilities/Constants';
import { ParseHashArgs } from '../../utilities/Helpers';
import { SetAccessToken, SetAuthExpiresAt } from '../../utilities/ApiUtils';
import { RouteProps } from 'react-router'
import { fetchValidateUser } from '../../redux/userDetail/actions';
import { useDispatch } from 'react-redux';


const CognitoAuthHandler = () => {

    let location = useLocation();

    const { redirect_url } = GetRedirectUrl({ location });
    const urlToUse = redirect_url && containsProtocol(redirect_url) ? redirect_url : "/";
    const dispatch = useDispatch();
    
    console.log(redirect_url);
    console.log(urlToUse);

    window.location.href = urlToUse;

    // Prepare user on server
    dispatch(fetchValidateUser());

    return (
        <Container maxWidth="xs" style={{ marginTop: '24px' }}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <CardContent style={{ textAlign: 'center' }}>
                            <LoaderPlaceholder loading={true} />
                            <Typography variant="caption">
                                Click <a href={urlToUse}>here</a> if not automatically redirected.
                            </Typography>
                        </CardContent>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}


type GetRedirectUrlProps = {
    location: RouteProps["location"];
}


const containsProtocol = (url: string) => {
    if (!url) return false;
    if (url.toLowerCase().indexOf('http') < 0) return false;

    return true;
}


const GetRedirectUrl = ({ location }: GetRedirectUrlProps) => {

    var id_token = "";
    var expires_at: number = 0;
    var now = new Date();
    var redirect_url = Configuration.BASE_HOST;

    if (location && location.hash) {

        // Retrieve args from url and set props
        var args: { [k: string]: any } = ParseHashArgs(location.hash);

        if (args["id_token"]) {
            id_token = args["id_token"];
            SetAccessToken(id_token);
        }

        if (args["expires_in"]) {
            expires_at = new Date().setSeconds(now.getSeconds() + args["expires_in"] - 60);
            SetAuthExpiresAt(expires_at);
        }

        if (args["referrer"]) {
            if (decodeURIComponent(args["referrer"])) {
                redirect_url = decodeURIComponent(args["referrer"]);
            }
        }
    }

    return {
        id_token,
        expires_at,
        redirect_url,
    };
}

export default CognitoAuthHandler;