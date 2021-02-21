import { Grid, Typography, useTheme } from "@material-ui/core";
import React, { ReactNode } from "react";
import IDashboardWidget from "../../../../../@types/DashboardWidget";
import ButtonSecondary from "../../../buttons/ButtonSecondary";
import LoaderAbsoluteCentred from "../../../loaders/LoaderAbsoluteCentred";

interface IWidgetSimpleGenerator {
    label: string | undefined,
    description: string | undefined,
    buttonLabel: string,
    outputLabel: string,
    outputValues: ReactNode,
    dashboardWidget: IDashboardWidget,
    onClickCallback(): void,
    loading: boolean,
}


function WidgetSimpleGenerator({
    label,
    description,
    onClickCallback,
    buttonLabel,
    outputLabel,
    dashboardWidget,
    loading,
    outputValues,
}: IWidgetSimpleGenerator) {

    const theme = useTheme();

    return (
        <div>
            <Grid item xs={12} style={{ textAlign: 'center', opacity: 0.75, marginBottom: theme.spacing(3) }}>
                <Typography variant="overline">
                    {label}
                </Typography><br />
                <Typography variant="caption">
                    {description}
                </Typography>
            </Grid>
            <div>
                <ButtonSecondary
                    onClick={onClickCallback}
                >
                    {buttonLabel}
                </ButtonSecondary>
            </div>
            <div>
                {outputValues}
            </div>
            <LoaderAbsoluteCentred loading={loading} />
        </div>
    )
}


export default WidgetSimpleGenerator;