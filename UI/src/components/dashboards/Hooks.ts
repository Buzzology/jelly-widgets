import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IFetchSearchDashboardsProps, fetchSearchDashboards } from "../../redux/dashboard/actions";
import IDashboard from "../../@types/Dashboard";


export interface IUseFetchDashboardsPageHookProps extends IFetchSearchDashboardsProps {
    minPageNumberToFetch: number;
}


export const useFetchDashboardsPageHook = ({ pageNumber, minPageNumberToFetch, pageSize, text, dashboardId }: IUseFetchDashboardsPageHookProps) => {

    const dispatch = useDispatch();
    const [fetching, setFetching] = useState<boolean>(false);
    const [morePages, setMorePages] = useState<boolean>(false);
    const [lastResultSet, setLastResultSet] = useState<IDashboard[]>([]);
    const [allResultsSet, setAllResultsSet] = useState<IDashboard[]>([]);

    useEffect(() => {

        // This allows us to prevent initial page load fetches by setting page number to something like zero
        if (pageNumber < minPageNumberToFetch) {
            return;
        }

        (async () => {

            setFetching(true);

            try {

                // Retrieve models
                var dashboards = await dispatch(fetchSearchDashboards({
                    pageSize,
                    pageNumber,
                    text,
                    dashboardId,
                })) as unknown as IDashboard[];

                if (dashboards && dashboards.length) {
                    setMorePages(dashboards.length >= pageSize)
                    setLastResultSet(dashboards);
                }
                else {
                    setMorePages(false);
                    setLastResultSet([]);
                }
            }
            finally {
                setFetching(false);
            }
        })();
    }, [minPageNumberToFetch, dispatch, pageNumber, pageSize, text, dashboardId]);

    // Merge any new result sets with existing
    useEffect(() => {

        if (lastResultSet.some(x => !allResultsSet.some(y => y.dashboardId === x.dashboardId))) {
            setAllResultsSet(allResultsSet.concat(lastResultSet));
        }
    }, [lastResultSet, allResultsSet]);

    return {
        lastResultSet,
        fetching,
        morePages,
        setAllResultsSet,
        allResultsSet,
    }
}