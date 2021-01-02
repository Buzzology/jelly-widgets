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
import { fetchWidgetByIdIfNeeded } from '../redux/widget/actions';
import PageWidgetView from '../components/widgets/pages/PageWidgetView';


const RouteWidget = () => {

    const { widgetId, dashboardId } = useParams() as any; 
    const location = useLocation();
    const { tags } = queryString.parse(location.search);
    const [fetchingWidget, setFetchingWidget] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(fetchWidgetByIdIfNeeded(widgetId));
            setFetchingWidget(false);
        })();
    }, [widgetId, setFetchingWidget, dispatch]);

    if(fetchingWidget) return <LoaderAbsoluteCentred loading={true} />

    return (
        <Switch>
            <Route render={props => <LayoutDefault routeProps={props}>
                <PageWidgetView
                    routeProps={props}
                    loading={false}
                    widgetId={widgetId}
                    dashboardId={dashboardId}
                />
            </LayoutDefault>} />
        </Switch>
    )
}


export default RouteWidget;