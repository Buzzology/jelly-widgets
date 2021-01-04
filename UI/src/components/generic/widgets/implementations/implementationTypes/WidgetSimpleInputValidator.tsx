import { TextField } from "@material-ui/core";
import { useState } from "react";
import IDashboardWidget from "../../../../../@types/DashboardWidget";
import ButtonSecondary from "../../../buttons/ButtonSecondary";
import LoaderAbsoluteCentred from "../../../loaders/LoaderAbsoluteCentred";

interface IWidgetSimpleInputValidatorProps {
    label: string,
    description: string,
    buttonLabel: string,
    inputLabel: string,
    outputLabel: string,
    outputValue: string | undefined,
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
            <LoaderAbsoluteCentred loading={loading} />
        </div>
    )
}


export default WidgetSimpleInputValidator;