import { useState, useEffect } from "react";import { fetchSearchUserDetails } from "../../redux/userDetail/actions";
import { IUserDetail } from "../../@types/UserDetail";
import { useDispatch } from 'react-redux';


export interface IUseFetchUserDetailsPageHookProps {
    pageNumber: number,
    pageSize: number,
    minPageNumberToFetch?: number,
    text?: string,
    userDetailId?: string,
}


export const useFetchUserDetailsPageHook = ({ pageNumber, minPageNumberToFetch = 1, pageSize, text, userDetailId }: IUseFetchUserDetailsPageHookProps) => {

    const dispatch = useDispatch();
    const [fetching, setFetching] = useState<boolean>(false);
    const [morePages, setMorePages] = useState<boolean>(false);
    const [lastResultSet, setLastResultSet] = useState<IUserDetail[]>([]);
    const [allResultsSet, setAllResultsSet] = useState<IUserDetail[]>([]);

    useEffect(() => {

        // This allows us to prevent initial page load fetches by setting page number to something like zero
        if (pageNumber < minPageNumberToFetch) {
            return;
        }

        (async () => {

            setFetching(true);

            try {

                // Retrieve results
                var resp: any = await dispatch(fetchSearchUserDetails({
                    pageSize,
                    pageNumber,
                    text: text || '',
                    userDetailId,
                }));

                // Check if there are more pages to show
                if (resp && resp.success && resp.data && resp.data.userDetails && resp.data.userDetails.length) {
                    setMorePages(resp.data.userDetails.length >= pageSize);
                    setLastResultSet(resp.data.userDetails);
                }
                else {
                    setMorePages(false);
                }
            }
            finally {
                setFetching(false);
            }
        })();
    }, [pageNumber, pageSize, dispatch, minPageNumberToFetch, text, userDetailId]);

    // Merge any new result sets with existing
    useEffect(() => {

        if (lastResultSet.some(x => !allResultsSet.some(y => y.userDetailId === x.userDetailId))) {
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