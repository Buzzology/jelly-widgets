import { TextField, useTheme, Chip, Tooltip, Grid, withStyles, Fade, Typography } from "@material-ui/core";
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
import { CustomColors } from "../../../../utilities/Styles";
import { WidgetNoResultsPlaceholder } from "../WidgetNoResultsPlaceholder";
import { selectorGetWidgetById } from "../../../../redux/widget/selectors";


interface IWidgetTaxFileNumberValidatorProps {
    dashboardWidget: IDashboardWidget,
}


function WidgetTaxFileNumberValidator({ dashboardWidget }: IWidgetTaxFileNumberValidatorProps) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const payloadResponses = useSelector((store: RootState) => selectorGetPayloadsByDashboardWidgetId(store, dashboardWidget.dashboardWidgetId));
    const [inputValue, setInputValue] = useState('');
    const theme = useTheme();
    const widget = useSelector((store: RootState) => selectorGetWidgetById(store, dashboardWidget.widgetId));
    

    const onClickHandler = async () => {

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



    if (!widget) return <WidgetNoResultsPlaceholder text="Widget not found." />;

    return (
        <div style={{ height: '100%' }}>
            <Grid container>
                <Grid item xs={12} style={{ textAlign: 'center', opacity: 0.75, marginBottom: theme.spacing(3) }}>
                    <Typography variant="overline">
                        {widget.name}
                    </Typography><br />
                    <Typography variant="caption">
                        {widget.description}
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <CustomBorderRadiusTextField
                        onChange={(e: any) => setInputValue(e?.target.value)}
                        fullWidth
                        style={{ textAlign: 'center', borderRadius: '4px 0 0 4px' }}
                        placeholder="_ _ _ _ _ _ _ _ _"
                        inputProps={{
                            style: {
                                textAlign: 'center',
                                borderRadius: '4px 0 0 4px',
                                color: CustomColors.MetalDarkTextColor,
                                border: 'none',
                                borderBottom: 'none',
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                padding: '15px 3px'
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <ButtonSecondary
                        onClick={onClickHandler}
                        variant="outlined"
                        color="default"
                        fullWidth
                        style={{ color: '#EEE', height: '100%', borderRadius: '0 4px 4px 0', marginLeft: -1, backgroundColor: 'rgba(0,0,0,0.4)' }}
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


const CustomBorderRadiusTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: `4px 0 0 4px`,
            },
        },
    },
})(TextField);


export default WidgetTaxFileNumberValidator;