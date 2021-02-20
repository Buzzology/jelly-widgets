import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import LayoutDefault from '../components/layout/LayoutDefault';
import ProductSelect from '../components/products/pages/ProductSelect';


const RouteProducts = () => {

    let match = useRouteMatch();

    return (
        <Switch>
            <Route
                path={`${match.path}`}
                render={props => (
                    <LayoutDefault routeProps={props}>
                        <ProductSelect />
                    </LayoutDefault>
                )}
            />
        </Switch>
    )
}


export default RouteProducts;