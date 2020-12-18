import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
// import RouteTopic from './RouteTopic';
import LayoutDefault from '../components/layout/LayoutDefault';


const RouteTopics = () => {

    // let match = useRouteMatch();

    // return (
    //     <Switch>
    //         <Route path={`${match.path}/search/:query?`} render={props => <LayoutDefault routeProps={props}>
    //             <PageTopicsSearch
    //                 routeProps={props}
    //                 loading={false}
    //             />
    //         </LayoutDefault>} />

    //         {/* NOTE: These all route to the same place, just doesn't seem to be a clean way to have optional paths other than params */}
    //         <Route path={`${match.path}/:topicId/posts/:postTitle/:postId/comment/:commentId`}><RouteTopic /></Route>
    //         <Route path={`${match.path}/:topicId/posts/:postTitle/:postId`}><RouteTopic /></Route>
    //         <Route path={`${match.path}/:topicId`}><RouteTopic /></Route>
    //     </Switch>
    // )
}


export default RouteTopics;