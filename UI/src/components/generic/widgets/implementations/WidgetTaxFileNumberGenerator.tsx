import { Fade, Grid, Chip, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IDashboardWidget from "../../../../@types/DashboardWidget";
import IPayload from "../../../../@types/Payload";
import { RootState } from "../../../../redux";
import { fetchDashboardWidgetProcessMessage } from "../../../../redux/dashboardWidget/actions";
import { selectorGetPayloadsByDashboardWidgetId } from "../../../../redux/payload/selectors";
import { selectorGetWidgetById } from "../../../../redux/widget/selectors";
import WidgetSimpleGenerator from "./implementationTypes/WidgetSimpleGenerator";
import ValidIcon from '@material-ui/icons/CheckRounded'
import InvalidIcon from '@material-ui/icons/WarningRounded'


interface IWidgetTaxFileNumberGeneratorProps {
    dashboardWidget: IDashboardWidget,
}


function WidgetTaxFileNumberGenerator({ dashboardWidget }: IWidgetTaxFileNumberGeneratorProps) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const payloadResponses = useSelector((store: RootState) => selectorGetPayloadsByDashboardWidgetId(store, dashboardWidget.dashboardWidgetId));
    const widget = useSelector((store: RootState) => selectorGetWidgetById(store, dashboardWidget?.widgetId || ''));

    const onClickHandler = async () => {

        setLoading(true);

        try {
            await dispatch(fetchDashboardWidgetProcessMessage({
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
            label={widget?.name}
            description={widget?.description}
            buttonLabel="Generate"
            outputLabel="Results"
            outputValues={OutputValues(payloadResponses)}
            dashboardWidget={dashboardWidget}
            onClickCallback={onClickHandler}
            loading={loading}
        />
    );
}


const OutputValues = (payloadResponses: IPayload[]) => {

    const theme = useTheme();

    return (
        payloadResponses?.length ? (
            <div style={{
                fontSize: '85%',
                opacity: 0.8,
                marginTop: theme.spacing(1),
                maxHeight: 155,
                overflow: 'hidden',
                overflowX: 'hidden'
            }}>
                <Grid container spacing={1}>
                    {
                        payloadResponses?.reverse().map(x => {
                            return (
                                <Fade in={true}>
                                    <Grid item xs={6} md={4}>
                                        <Chip
                                            variant="outlined"
                                            avatar={x.payloadResponses?.valid === "true" ? <ValidIcon /> : <InvalidIcon />}
                                            label={x.payloadResponses?.response || "Invalid response"}
                                            style={{ width: '100%' }}
                                        />
                                    </Grid>
                                </Fade>
                            )
                        })
                    }
                </Grid>
            </div>
        ) : null
    );
}


export default WidgetTaxFileNumberGenerator;