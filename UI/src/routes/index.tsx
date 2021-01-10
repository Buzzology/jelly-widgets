import React, { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
import { GetLoginUrl } from './RouteLinkHelpers';
import CognitoAuthHandler from '../components/user/CognitoAuthHandler';
import LayoutDefault from '../components/layout/LayoutDefault';
import RouteRedirects from './RouteRedirects';
import usePageTracking from '../components/generic/util/ReactRouterAnalytics';
import RouteDashboards from './RouteDashboards';
import { useDispatch } from 'react-redux';
import { fetchSearchDashboards } from '../redux/dashboard/actions';
import LoaderAbsoluteCentred from '../components/generic/loaders/LoaderAbsoluteCentred';
import RouteWidgets from './RouteWidgets';
import { fetchSearchWidgets } from '../redux/widget/actions';
import { usePrepareAccessTokenIfRequiredHook } from '../components/user/Hooks';
import { useIsAuthenticated } from '@azure/msal-react';


const RouteManagerCustom = () => {

    usePrepareAccessTokenIfRequiredHook();
    usePageTracking();

    const dispatch = useDispatch();
    const [fetchingDashboards, setFetchingDashboards] = useState(false);
    const [, setFetchingWidgets] = useState(false);
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {

        if (isAuthenticated) return;
        setFetchingDashboards(true);
        (async () => {
            await dispatch(fetchSearchDashboards({ pageSize: 20, pageNumber: 1 }));
            setFetchingDashboards(false);
        })();
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) return;
        setFetchingWidgets(true);
        (async () => {
            await dispatch(fetchSearchWidgets({ pageSize: 100, pageNumber: 1 }));
            setFetchingWidgets(false);
        })();
    }, [dispatch, isAuthenticated]);

    return (
        <Switch>
            <Route exact={true} path="/login" component={() => { window.location.href = GetLoginUrl(); return null; }} />
            <Route exact={true} path="/signin-oidc" component={CognitoAuthHandler} />
            <Route path={'/redirect/:type?/:id?'}><RouteRedirects /></Route>
            <Route path={'/dashboards'}>
                <RouteDashboards />
            </Route>
            <Route path={'/widgets'}>
                <RouteWidgets />
            </Route>

            {/* <Route path={'/topics'}><RouteTopics /></Route> */}
            <Route render={props => <LayoutDefault routeProps={props}>
                {/* <DashboardPage {...props} /> */}
                <LoaderAbsoluteCentred loading={fetchingDashboards} />
            </LayoutDefault>} />
        </Switch>
    )
}


export default RouteManagerCustom;