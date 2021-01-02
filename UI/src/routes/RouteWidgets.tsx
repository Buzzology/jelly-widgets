import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import LayoutDefault from '../components/layout/LayoutDefault';
import PageWidgetsSearch from '../components/widgets/pages/PageWidgetSearch';
import RouteWidget from './RouteWidget';


const RouteWidgets = () => {

    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/search/:dashboardId/:query?`} render={props => <LayoutDefault routeProps={props}>
                <PageWidgetsSearch
                    routeProps={props}
                    loading={false}
                />
            </LayoutDefault>} />
            <Route path={`${match.path}/:widgetId/:widgetName/:dashboardId`}><RouteWidget /></Route>
            <Route><RouteWidget /></Route>
        </Switch>
    )
}


export default RouteWidgets;