import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IDashboardWidget from "../../../../@types/DashboardWidget";
import { RootState } from "../../../../redux";
import { fetchDashboardWidgetProcessMessage } from "../../../../redux/dashboardWidget/actions";
import { selectorGetDashboardWidgetById } from "../../../../redux/dashboardWidget/selectors";
import { selectorGetLatestPayloadByDashboardWidgetId, selectorGetPayloads, selectorGetPayloadsByDashboardWidgetId } from "../../../../redux/payload/selectors";
import WidgetSimpleGenerator from "./implementationTypes/WidgetSimpleGenerator";
import WidgetSimpleInputValidator from "./implementationTypes/WidgetSimpleInputValidator";


interface IWidgetTaxFileNumberValidatorProps {
    dashboardWidget: IDashboardWidget,
}


function WidgetTaxFileNumberValidator({ dashboardWidget }: IWidgetTaxFileNumberValidatorProps) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const payloadResponses = useSelector((store: RootState) => selectorGetLatestPayloadByDashboardWidgetId(store, dashboardWidget.dashboardWidgetId));

    const onClickHandler = async (e: any, input: string) => {

        setLoading(true);

        try {
            dispatch(fetchDashboardWidgetProcessMessage({
                widgetId: dashboardWidget.widgetId,
                dashboardWidgetId: dashboardWidget.dashboardWidgetId,
                payloads: {
                    tfn: input,
                },
            }));
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <WidgetSimpleInputValidator
            label="Tax File Number Validator"
            description="Validate Australian tax file numbers for testing."
            buttonLabel="Validate"
            inputLabel="TFN to Test"
            outputLabel="Results"
            outputValue={payloadResponses?.payloadResponses?.valid}
            dashboardWidget={dashboardWidget}
            onClickCallback={onClickHandler}
            loading={loading}
        />
    );
}


export default WidgetTaxFileNumberValidator;