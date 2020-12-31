// import React, { useState, useEffect } from 'react';
// import {
//     Switch,
//     useParams,
//     Route,
//     useLocation,
// } from "react-router-dom";
// import LoaderAbsoluteCentred from '../components/generic/loaders/LoaderAbsoluteCentred';
// import LayoutDefault from '../components/layout/LayoutDefault';
// import { useDispatch } from 'react-redux';
// import queryString from 'query-string';


// const RouteDashboard = () => {

//     const { dashboardId } = useParams(); 
//     const location = useLocation();
//     const { tags } = queryString.parse(location.search);
//     const [fetchingDashboard, setFetchingDashboard] = useState(false);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         (async () => {
//             await dispatch(fetchDashboardByIdIfNeeded(dashboardId));
//             setFetchingDashboard(false);
//         })();
//     }, [dashboardId, setFetchingDashboard, dispatch]);

//     useEffect(() => {
//         (async () => {
//             await dispatch(fetchSubjectsByIdIfNeeded(dashboardId));
//             setFetchingDashboard(false);
//         })();
//     }, [dashboardId, setFetchingDashboard, dispatch]);

//     if(fetchingDashboard) return <LoaderAbsoluteCentred loading={true} />

//     return (
//         <Switch>
//             <Route render={props => <LayoutDefault routeProps={props}>
//                 <PageDashboardView
//                     routeProps={props}
//                     loading={false}
//                     dashboardId={dashboardId}
//                     tags={String(tags)}
//                 />
//             </LayoutDefault>} />
//         </Switch>
//     )
// }


// export default RouteDashboard;

export default 1;