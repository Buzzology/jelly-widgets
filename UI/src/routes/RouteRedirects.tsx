import React, { useState } from 'react';
import LoaderAbsoluteCentred from '../components/generic/loaders/LoaderAbsoluteCentred';


const RouteRedirects = () => {

    const [loading] = useState(false);

    return (
        <>
            <LoaderAbsoluteCentred loading={loading} />
            {/* <WidgetNoResultsPlaceholder text={`Unrecognised redirect: ${entityType}`} /> */}
        </>
    )
}


export default RouteRedirects;