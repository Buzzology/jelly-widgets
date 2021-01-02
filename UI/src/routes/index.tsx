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


const RouteManagerCustom = () => {
    
	usePageTracking();

    const dispatch = useDispatch();
    const [fetchingDashboards, setFetchingDashboards] = useState(false);

    useEffect(() => {
        setFetchingDashboards(true);
        (async () => {
            await dispatch(fetchSearchDashboards({ pageSize: 20, pageNumber: 1 }));
            setFetchingDashboards(false);
        })();
    }, [dispatch]);

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