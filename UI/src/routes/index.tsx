import React, {  } from 'react';
import { Switch, Route } from "react-router-dom";
import { GetLoginUrl } from './RouteLinkHelpers';
import CognitoAuthHandler from '../components/user/CognitoAuthHandler';
import LayoutDefault from '../components/layout/LayoutDefault';
import RouteRedirects from './RouteRedirects';
import usePageTracking from '../components/generic/util/ReactRouterAnalytics';


const RouteManagerCustom = () => {
    
	usePageTracking();

    // const dispatch = useDispatch();
    // const [fetchingTopics, setFetchingTopics] = useState(false);

    // useEffect(() => {
    //     setFetchingTopics(true);
    //     (async () => {
    //         await dispatch(fetchSearchTopics({ pageSize: 20, pageNumber: 1 }));
    //         setFetchingTopics(false);
    //     })();
    // }, [dispatch]);

    return (
        <Switch>
            <Route exact={true} path="/login" component={() => { window.location.href = GetLoginUrl(); return null; }} />
            <Route exact={true} path="/signin-oidc" component={CognitoAuthHandler} />
            <Route path={'/redirect/:type?/:id?'}><RouteRedirects /></Route>
            {/* <Route path={'/topics'}><RouteTopics /></Route> */}
            <Route render={props => <LayoutDefault routeProps={props}>
                {/* <DashboardPage {...props} /> */}
                {/* <LoaderAbsoluteCentred loading={fetchingMemberships || fetchingTopics} /> */}
            </LayoutDefault>} />
            {/* <Route path={'/topics'}>
            <RouteTopics />
            </Route> */}
        </Switch>
    )
}


export default RouteManagerCustom;