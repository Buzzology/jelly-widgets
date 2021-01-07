import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IDashboardWidget from "../../../../@types/DashboardWidget";
import { RootState } from "../../../../redux";
import { fetchDashboardWidgetProcessMessage } from "../../../../redux/dashboardWidget/actions";
import { selectorGetLatestPayloadByDashboardWidgetId, selectorGetPayloads, selectorGetPayloadsByDashboardWidgetId } from "../../../../redux/payload/selectors";
import WidgetSimpleGenerator from "./implementationTypes/WidgetSimpleGenerator";


interface IWidgetTaxFileNumberGeneratorProps {
    dashboardWidget: IDashboardWidget,
}


function WidgetTaxFileNumberGenerator({ dashboardWidget }: IWidgetTaxFileNumberGeneratorProps) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const payloadResponses = useSelector((store: RootState) => selectorGetLatestPayloadByDashboardWidgetId(store, dashboardWidget.dashboardWidgetId));

    const onClickHandler = async () => {

        setLoading(true);

        try {
            dispatch(fetchDashboardWidgetProcessMessage({
                widgetId: dashboardWidget.widgetId,
                dashboardWidgetId: dashboardWidget.dashboardWidgetId,
                payloads: {},
            }));
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <WidgetSimpleGenerator
            label="Tax File Number Generator"
            description="Generate Australian tax file numbers for testing."
            buttonLabel="Generate"
            outputLabel="Results"
            outputValue={payloadResponses?.payloadResponses?.tfn}
            dashboardWidget={dashboardWidget}
            onClickCallback={onClickHandler}
            loading={loading}
        />
    );
}


export default WidgetTaxFileNumberGenerator;