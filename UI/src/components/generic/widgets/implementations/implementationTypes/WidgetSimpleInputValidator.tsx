import { Grid, TextField, Typography, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import IDashboardWidget from "../../../../../@types/DashboardWidget";
import WidgetIcon from "../../../../widgets/WidgetIcon";
import ButtonSecondary from "../../../buttons/ButtonSecondary";
import LoaderAbsoluteCentred from "../../../loaders/LoaderAbsoluteCentred";

interface IWidgetSimpleInputValidatorProps {
    label: string | undefined,
    description: string | undefined,
    buttonLabel: string,
    inputLabel: string,
    outputLabel: string,
    outputValue: string | undefined,
    outputValueMessage: string | undefined,
    dashboardWidget: IDashboardWidget,
    onClickCallback(e: any, inputVal: string): void,
    loading: boolean,
}


function WidgetSimpleInputValidator({
    label,
    description,
    onClickCallback,
    buttonLabel,
    outputLabel,
    dashboardWidget,
    loading,
    outputValue,
    outputValueMessage,
}: IWidgetSimpleInputValidatorProps) {

    const [inputValue, setInputValue] = useState('');
    const theme = useTheme();

    return (
        <div style={{ height: '100%' }}>
            <Grid item xs={12} style={{ marginBottom: theme.spacing(3), display: 'flex' }}>
                <div style={{
                    width: 60,
                    marginRight: 20,
                }}>
                    <WidgetIcon widgetId={dashboardWidget.widgetId} />
                </div>
                <div
                    style={{
                        flex: 1,
                    }}
                >
                    <Typography variant="body1" style={{ fontWeight: 500 }}>
                        {label}
                    </Typography>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                </div>

            </Grid>
            <div>
                <TextField
                    onChange={(e: any) => setInputValue(e?.target.value)}
                >

                </TextField>
                <ButtonSecondary
                    onClick={(e: any) => onClickCallback(e, inputValue)}
                >
                    {buttonLabel}
                </ButtonSecondary>
            </div>
            <div>
                {outputLabel}: {outputValue}
            </div>
            {outputValueMessage ? (
                <div style={{ fontSize: '85%', opacity: 0.8 }}>
                    {outputValueMessage}
                </div>
            ) : null}
            <LoaderAbsoluteCentred loading={loading} />
        </div>
    )
}


export default WidgetSimpleInputValidator;