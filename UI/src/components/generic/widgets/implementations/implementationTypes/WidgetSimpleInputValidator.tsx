import { TextField } from "@material-ui/core";
import { useState } from "react";
import IDashboardWidget from "../../../../../@types/DashboardWidget";
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

    return (
        <div>
            {label}
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