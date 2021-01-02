import React, { useState, useEffect } from 'react';
import {
    Switch,
    useParams,
    Route,
    useLocation,
} from "react-router-dom";
import LoaderAbsoluteCentred from '../components/generic/loaders/LoaderAbsoluteCentred';
import LayoutDefault from '../components/layout/LayoutDefault';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import { fetchDashboardByIdIfNeeded } from '../redux/dashboard/actions';
import PageDashboardView from '../components/dashboards/pages/PageDashboardView';


const RouteDashboard = () => {

    const { dashboardId } = useParams() as any; 
    const location = useLocation();
    const { tags } = queryString.parse(location.search);
    const [fetchingDashboard, setFetchingDashboard] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(fetchDashboardByIdIfNeeded(dashboardId));
            setFetchingDashboard(false);
        })();
    }, [dashboardId, setFetchingDashboard, dispatch]);

    if(fetchingDashboard) return <LoaderAbsoluteCentred loading={true} />

    return (
        <Switch>
            <Route render={props => <LayoutDefault routeProps={props}>
                <PageDashboardView
                    routeProps={props}
                    loading={false}
                    dashboardId={dashboardId}
                />
            </LayoutDefault>} />
        </Switch>
    )
}


export default RouteDashboard;