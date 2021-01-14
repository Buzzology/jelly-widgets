import { Typography, TextField, useTheme, Chip, Tooltip, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IDashboardWidget from "../../../../@types/DashboardWidget";
import { RootState } from "../../../../redux";
import { fetchDashboardWidgetProcessMessage } from "../../../../redux/dashboardWidget/actions";
import { selectorGetLatestPayloadByDashboardWidgetId, selectorGetPayloadsByDashboardWidgetId } from "../../../../redux/payload/selectors";
import { selectorGetWidgetById } from "../../../../redux/widget/selectors";
import ButtonSecondary from "../../buttons/ButtonSecondary";
import LoaderAbsoluteCentred from "../../loaders/LoaderAbsoluteCentred";
import WidgetSimpleInputValidator from "./implementationTypes/WidgetSimpleInputValidator";
import ValidIcon from '@material-ui/icons/CheckRounded'
import InvalidIcon from '@material-ui/icons/WarningRounded'


interface IWidgetTaxFileNumberValidatorProps {
    dashboardWidget: IDashboardWidget,
}


function WidgetTaxFileNumberValidator({ dashboardWidget }: IWidgetTaxFileNumberValidatorProps) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const payloadResponses = useSelector((store: RootState) => selectorGetPayloadsByDashboardWidgetId(store, dashboardWidget.dashboardWidgetId));
    const widget = useSelector((store: RootState) => selectorGetWidgetById(store, dashboardWidget?.widgetId || ''));
    const [inputValue, setInputValue] = useState('');
    const theme = useTheme();

    const onClickHandler = async (e: any) => {

        setLoading(true);

        try {
            dispatch(fetchDashboardWidgetProcessMessage({
                widgetId: dashboardWidget.widgetId,
                dashboardWidgetId: dashboardWidget.dashboardWidgetId,
                payloads: {
                    tfn: inputValue,
                },
            }));
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ height: '100%', textAlign: 'center' }}>
            <Typography noWrap={true} variant="body1">
                {widget?.name}
            </Typography>
            <Typography noWrap={true} variant="body2">
                {widget?.description}
            </Typography>
            <div style={{ marginTop: theme.spacing(2) }}>
                <TextField
                    onChange={(e: any) => setInputValue(e?.target.value)}
                    fullWidth
                    style={{ textAlign: 'center' }}
                    variant="outlined"
                    placeholder="Valid an Australian TFN"
                />
                <ButtonSecondary
                    onClick={onClickHandler}
                    variant="outlined"
                    color="default"
                    fullWidth
                    style={{ marginTop: theme.spacing(1) }}
                >
                    Validate
                </ButtonSecondary>
            </div>
            <div style={{ fontSize: '85%', opacity: 0.8, marginTop: theme.spacing(1), maxHeight: 155, overflow: 'hidden', overflowX: 'hidden' }}>
                <Grid container spacing={1}>
                    {
                        payloadResponses?.reverse().map(x => {
                            return (
                                <Grid item xs={6} md={4}>
                                    <Tooltip title={x.payloadResponses?.message}>
                                        <Chip
                                            variant="outlined"
                                            avatar={x.payloadResponses?.valid === "true" ? <ValidIcon /> : <InvalidIcon />}
                                            label={x.payloadResponses?.requestValue || "Invalid value"}
                                            style={{ width: '100%' }}
                                        />
                                    </Tooltip>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>

            <LoaderAbsoluteCentred loading={loading} />
        </div>
    );
}


export default WidgetTaxFileNumberValidator;