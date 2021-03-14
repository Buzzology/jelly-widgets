import React, { ReactNode } from "react";
import IDashboardWidget from "../../../../../@types/DashboardWidget";
import ButtonSecondary from "../../../buttons/ButtonSecondary";
import LoaderAbsoluteCentred from "../../../loaders/LoaderAbsoluteCentred";
import { WidgetHeader } from "./WidgetHeader";


interface IWidgetSimpleGenerator {
    label: string | undefined,
    description: string | undefined,
    buttonLabel: string,
    outputLabel: string,
    outputValues: ReactNode,
    dashboardWidget: IDashboardWidget,
    onClickCallback(): void,
    loading: boolean,
    img?: string,
}


function WidgetSimpleGenerator({
    label,
    description,
    onClickCallback,
    buttonLabel,
    dashboardWidget,
    loading,
    outputValues,
}: IWidgetSimpleGenerator) {

    return (
        <div>
            <WidgetHeader
                widgetId={dashboardWidget.widgetId}
                title={label}
                description={description}
            />
            <div>
                <ButtonSecondary
                    onClick={onClickCallback}
                    variant="outlined"
                    fullWidth
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