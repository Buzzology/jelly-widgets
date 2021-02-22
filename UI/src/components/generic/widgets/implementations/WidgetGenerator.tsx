import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { selectorGetDashboardWidgetById } from "../../../../redux/dashboardWidget/selectors";
import { WidgetIds } from "../../../../utilities/Constants";
import { WidgetNoResultsPlaceholder } from "../WidgetNoResultsPlaceholder";
import WidgetAustralianBusinessNumberGenerator from "./WidgetAustralianBusinessNumberGenerator";
import WidgetAustralianBusinessNumberValidator from "./WidgetAustralianBusinessNumberValidator";
import WidgetTaxFileNumberGenerator from "./WidgetTaxFileNumberGenerator";
import WidgetTaxFileNumberValidator from "./WidgetTaxFileNumberValidator";
import MissingIcon from "@material-ui/icons/NotInterested"
import WidgetAustralianCompanyNumberGenerator from "./WidgetAustralianCompanyNumberGenerator";

interface IWidgetGenerator {
    widgetId: string,
    dashboardWidgetId: string,
}

function WidgetGenerator({ widgetId, dashboardWidgetId }: IWidgetGenerator) {

    const dashboardWidget = useSelector((store: RootState) => selectorGetDashboardWidgetById(store, dashboardWidgetId));

    if (!dashboardWidget) return <WidgetNotFound />;

    switch (widgetId) {
        case WidgetIds.TFN_GENERATOR:
            return <WidgetTaxFileNumberGenerator dashboardWidget={dashboardWidget} />;
        case WidgetIds.TFN_VALIDATOR:
            return <WidgetTaxFileNumberValidator dashboardWidget={dashboardWidget} />;
        case WidgetIds.ABN_GENERATOR:
            return <WidgetAustralianBusinessNumberGenerator dashboardWidget={dashboardWidget} />;
        case WidgetIds.ABN_VALIDATOR:
            return <WidgetAustralianBusinessNumberValidator dashboardWidget={dashboardWidget} />;
        case WidgetIds.ACN_GENERATOR:
            return <WidgetAustralianCompanyNumberGenerator dashboardWidget={dashboardWidget} />;
        // case WidgetIds.ACN_VALIDATOR:
        //     return <WidgetAustralianCompanyNumberValidator dashboardWidget={dashboardWidget} />;
        default:
            debugger;
            return <WidgetNotFound />;
    }
}


function WidgetNotFound() {
    return (
        <WidgetNoResultsPlaceholder
            icon={MissingIcon}
            text="Not found"
            description="This widget no longer appears to be available."
            fade={true}
        />
    );
}


export default WidgetGenerator;