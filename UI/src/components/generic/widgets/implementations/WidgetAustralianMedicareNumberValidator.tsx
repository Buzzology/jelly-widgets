import { TextField, useTheme, Chip, Tooltip, Grid, Fade } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IDashboardWidget from "../../../../@types/DashboardWidget";
import { RootState } from "../../../../redux";
import { fetchDashboardWidgetProcessMessage } from "../../../../redux/dashboardWidget/actions";
import { selectorGetPayloadsByDashboardWidgetId } from "../../../../redux/payload/selectors";
import ButtonSecondary from "../../buttons/ButtonSecondary";
import LoaderAbsoluteCentred from "../../loaders/LoaderAbsoluteCentred";
import ValidIcon from '@material-ui/icons/CheckRounded'
import InvalidIcon from '@material-ui/icons/WarningRounded'
import { WidgetNoResultsPlaceholder } from "../WidgetNoResultsPlaceholder";
import { selectorGetWidgetById } from "../../../../redux/widget/selectors";
import { WidgetHeader } from "./implementationTypes/WidgetHeader";


interface IWidgetAustralianMedicareNumberValidatorProps {
    dashboardWidget: IDashboardWidget,
}


function WidgetAustralianMedicareNumberValidator({ dashboardWidget }: IWidgetAustralianMedicareNumberValidatorProps) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const payloadResponses = useSelector((store: RootState) => selectorGetPayloadsByDashboardWidgetId(store, dashboardWidget.dashboardWidgetId));
    const [inputValue, setInputValue] = useState('');
    const theme = useTheme();
    const widget = useSelector((store: RootState) => selectorGetWidgetById(store, dashboardWidget.widgetId));

    const onClickHandler = async () => {

        setLoading(true);

        try {
            await dispatch(fetchDashboardWidgetProcessMessage({
                widgetId: dashboardWidget.widgetId,
                dashboardWidgetId: dashboardWidget.dashboardWidgetId,
                payloads: {
                    medicareNumber: inputValue,
                },
            }));
        }
        finally {
            setLoading(false);
        }
    }

    if (!widget) return <WidgetNoResultsPlaceholder text="Widget not found." />;

    return (
        <div style={{ height: '100%' }}>
            <Grid container>
                <Grid item xs={12}>
                    <WidgetHeader
                        widgetId={dashboardWidget.widgetId}
                        title={widget.name}
                        description={widget.description}
                    />
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        onChange={(e: any) => setInputValue(e?.target.value)}
                        fullWidth
                        variant="outlined"
                        placeholder="_ _ _ _ _ _ _ _ _"
                        inputProps={{
                            style: {
                                textAlign: 'center',
                                padding: '9px 8px'
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={3} style={{ paddingLeft: 16 }}>
                    <ButtonSecondary
                        onClick={onClickHandler}
                        variant="outlined"
                        color="default"
                        fullWidth
                    >
                        Validate
                    </ButtonSecondary>
                </Grid>
            </Grid>
            {payloadResponses?.length ? (
                <div style={{ fontSize: '85%', opacity: 0.8, marginTop: theme.spacing(1), maxHeight: 155, overflow: 'hidden', overflowX: 'hidden' }}>
                    <Grid container spacing={1}>
                        {
                            payloadResponses?.reverse().map(x => {
                                return (
                                    <Fade in={true}>
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
                                    </Fade>
                                )
                            })
                        }
                    </Grid>
                </div>
            ) : null
            }
            <LoaderAbsoluteCentred loading={loading} />
        </div >
    );
}


export default WidgetAustralianMedicareNumberValidator;