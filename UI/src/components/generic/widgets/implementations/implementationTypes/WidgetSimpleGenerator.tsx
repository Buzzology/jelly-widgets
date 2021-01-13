import IDashboardWidget from "../../../../../@types/DashboardWidget";
import ButtonSecondary from "../../../buttons/ButtonSecondary";
import LoaderAbsoluteCentred from "../../../loaders/LoaderAbsoluteCentred";

interface IWidgetSimpleGenerator {
    label: string | undefined,
    description: string | undefined,
    buttonLabel: string,
    outputLabel: string,
    outputValue: string | undefined,
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
    outputValue,
}: IWidgetSimpleGenerator) {

    return (
        <div>
            {label}
            <div>
                <ButtonSecondary
                    onClick={onClickCallback}
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


export default WidgetSimpleGenerator;