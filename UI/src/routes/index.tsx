import React, { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
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
import { fetchGetWidgetUserExecutionTracker } from '../redux/widgetUserExecutionTracker/actions';
import { fetchSearchSubscriptions } from '../redux/subscription/actions';
import { Button } from '@material-ui/core';
import RouteProducts from './RouteProducts';
import LoaderInitialPage from '../components/generic/loaders/LoaderInitialPage';


const RouteManagerCustom = () => {

    const { loading: loadingAuthentication, account, instance } = usePrepareAccessTokenIfRequiredHook();
    usePageTracking();

    const dispatch = useDispatch();
    const [fetchingDashboards, setFetchingDashboards] = useState(false);
    const [fetchingWidgets, setFetchingWidgets] = useState(false);
    const isAuthenticated = useIsAuthenticated();
    const [fetchingWidgetUserExecutionTracker, setFetchingWidgetUserExecutionTracker] = useState(false);
    const [fetchingSubscriptions, setFetchingSubscriptions] = useState(false);

    useEffect(() => {

        if (!isAuthenticated || loadingAuthentication) return;

        // Fetch dashboards
        setFetchingDashboards(true);
        (async () => {
            await dispatch(fetchSearchDashboards({ pageSize: 20, pageNumber: 1 }));
            setFetchingDashboards(false);
        })();

        // Fetch widgets
        setFetchingWidgets(true);
        (async () => {
            await dispatch(fetchSearchWidgets({ pageSize: 100, pageNumber: 1 }));
            setFetchingWidgets(false);
        })();

        // Fetch execution tracker
        setFetchingWidgetUserExecutionTracker(true);
        (async () => {
            await dispatch(fetchGetWidgetUserExecutionTracker());
            setFetchingWidgetUserExecutionTracker(false);
        })();

        // Fetch subscriptions
        setFetchingSubscriptions(true);
        (async () => {
            await dispatch(fetchSearchSubscriptions({ active: true, pageNumber: 1, pageSize: 100 }));
            setFetchingSubscriptions(false);
        })();

    }, [dispatch, isAuthenticated, loadingAuthentication]);

    if (loadingAuthentication) {
        return (
            <LoaderInitialPage loading={true} />
        )
    }

    if (!account) {
        return (
            <div>
                This is where any unauthenticated routes should go.
                <Button onClick={() => instance.loginRedirect()}>
                    Login
                </Button>
            </div>
        )
    }

    return (
        <Switch>
            <Route exact={true} path="/login" component={() => { instance.loginRedirect(); return null; }} />
            <Route exact={true} path="/signin-oidc" component={CognitoAuthHandler} />
            <Route path={'/redirect/:type?/:id?'}><RouteRedirects /></Route>
            <Route path={'/dashboards'}>
                <RouteDashboards />
            </Route>
            <Route path={'/products'}>
                <RouteProducts />
            </Route>
            <Route path={'/widgets'}>
                <RouteWidgets />
            </Route>

            {/* <Route path={'/topics'}><RouteTopics /></Route> */}
            <Route render={props => <LayoutDefault routeProps={props}>
                {/* <DashboardPage {...props} /> */}
                <LoaderAbsoluteCentred loading={fetchingDashboards || fetchingWidgetUserExecutionTracker || fetchingWidgets || fetchingSubscriptions} />
            </LayoutDefault>} />
        </Switch>
    )
}


export default RouteManagerCustom;