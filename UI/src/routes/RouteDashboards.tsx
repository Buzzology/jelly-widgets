import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import RouteDashboard from './RouteDashboard';


const RouteTopics = () => {

    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:dashboardId/:dashboardName?/:dashboardWidgetId`}><RouteDashboard /></Route>
            <Route><RouteDashboard /></Route>
        </Switch>
    )
}


export default RouteTopics;