import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IDashboardWidget from "../../../../@types/DashboardWidget";
import { RootState } from "../../../../redux";
import { fetchDashboardWidgetProcessMessage } from "../../../../redux/dashboardWidget/actions";
import { selectorGetLatestPayloadByDashboardWidgetId } from "../../../../redux/payload/selectors";
import { selectorGetWidgetById } from "../../../../redux/widget/selectors";
import WidgetSimpleInputValidator from "./implementationTypes/WidgetSimpleInputValidator";


interface IWidgetTaxFileNumberValidatorProps {
    dashboardWidget: IDashboardWidget,
}


function WidgetTaxFileNumberValidator({ dashboardWidget }: IWidgetTaxFileNumberValidatorProps) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const payloadResponses = useSelector((store: RootState) => selectorGetLatestPayloadByDashboardWidgetId(store, dashboardWidget.dashboardWidgetId));
    const widget = useSelector((store: RootState) => selectorGetWidgetById(store, dashboardWidget?.widgetId || ''));

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
            label={widget?.name}
            description={widget?.description}
            buttonLabel="Validate"
            inputLabel="TFN to Test"
            outputLabel="Results"
            outputValue={payloadResponses?.payloadResponses?.valid}
            outputValueMessage={payloadResponses?.payloadResponses?.message}
            dashboardWidget={dashboardWidget}
            onClickCallback={onClickHandler}
            loading={loading}
        />
    );
}


export default WidgetTaxFileNumberValidator;