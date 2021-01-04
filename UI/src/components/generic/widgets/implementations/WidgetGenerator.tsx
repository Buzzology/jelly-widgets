import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { selectorGetDashboardWidgetById } from "../../../../redux/dashboardWidget/selectors";
import { WidgetIds } from "../../../../utilities/Constants";
import WidgetTaxFileNumberGenerator from "./WidgetTaxFileNumberGenerator";
import WidgetTaxFileNumberValidator from "./WidgetTaxFileNumberValidator";

interface IWidgetGenerator {
    widgetId: string,
    dashboardWidgetId: string,
}

function WidgetGenerator({ widgetId, dashboardWidgetId }: IWidgetGenerator) {

    const dashboardWidget = useSelector((store: RootState) => selectorGetDashboardWidgetById(store, dashboardWidgetId));

    if(!dashboardWidget) return <WidgetNotFound />;

    switch (widgetId) {
        case WidgetIds.TFN_GENERATOR:
            return <WidgetTaxFileNumberGenerator dashboardWidget={dashboardWidget} />;
        case WidgetIds.TFN_VALIDATOR:
            return <WidgetTaxFileNumberValidator dashboardWidget={dashboardWidget} />;
        default:
            return <WidgetNotFound />;
    }
}


function WidgetNotFound(){
    return <Typography>Widget not found.</Typography>;
}


export default WidgetGenerator;