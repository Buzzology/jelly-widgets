import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IFetchSearchWidgetsProps, fetchSearchWidgets } from "../../redux/widget/actions";
import IWidget from "../../@types/Widget";


export interface IUseFetchWidgetsPageHookProps extends IFetchSearchWidgetsProps {
    minPageNumberToFetch: number;
}


export const useFetchWidgetsPageHook = ({ pageNumber, minPageNumberToFetch, pageSize, name, widgetId }: IUseFetchWidgetsPageHookProps) => {

    const dispatch = useDispatch();
    const [fetching, setFetching] = useState<boolean>(false);
    const [morePages, setMorePages] = useState<boolean>(false);
    const [lastResultSet, setLastResultSet] = useState<IWidget[]>([]);
    const [allResultsSet, setAllResultsSet] = useState<IWidget[]>([]);

    useEffect(() => {

        // This allows us to prevent initial page load fetches by setting page number to something like zero
        if (pageNumber < minPageNumberToFetch) {
            return;
        }

        (async () => {

            setFetching(true);

            try {

                var widgets = await dispatch(fetchSearchWidgets({
                    pageSize,
                    pageNumber,
                    name,
                    widgetId,
                })) as unknown as IWidget[];

                if (widgets && widgets.length) {
                    setMorePages(widgets.length >= pageSize)
                    setLastResultSet(widgets);
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
    }, [minPageNumberToFetch, dispatch, pageNumber, pageSize, name, widgetId]);

    // Merge any new result sets with existing
    useEffect(() => {

        if (lastResultSet.some(x => !allResultsSet.some(y => y.widgetId === x.widgetId))) {
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