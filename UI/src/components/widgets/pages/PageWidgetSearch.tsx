import React, {  } from 'react';
import { Container } from '@material-ui/core';
import { RouteComponentProps, useParams } from 'react-router-dom';
import LoaderAbsoluteCentred from '../../generic/loaders/LoaderAbsoluteCentred';
import WidgetsSearchWidget from '../WidgetsSearchWidget';


interface IPageWidgetsSearchProps {
    routeProps: RouteComponentProps<any>,
    loading: boolean
}

const PageWidgetsSearch = ({ loading }: IPageWidgetsSearchProps) => {

    const { query } = useParams() as any;

    return (
        <Container style={{
            paddingTop: 24,
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0,
            marginRight: 0,
        }}
            maxWidth={false}
        >
            <WidgetsSearchWidget
                query={query}
            />
            <LoaderAbsoluteCentred loading={loading} />
        </Container>
    );
}


export default PageWidgetsSearch;