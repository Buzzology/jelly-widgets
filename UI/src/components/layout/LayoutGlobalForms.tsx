import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UiFormStateIdEnum } from "../../@types/UiFormState";
import { RootState } from "../../redux";
import { setFormOpenState } from "../../redux/uiFormState/actions";
import { selectorGetUiFormStates } from "../../redux/uiFormState/selectors";
import ModalDashboardCreate from "../dashboards/modals/ModalDashboardCreate";
import ModalDashboardUpdate from "../dashboards/modals/ModalDashboardUpdate";

const LayoutGlobalForms = () => {

    const dispatch = useDispatch();

    const closeForm = (form: UiFormStateIdEnum) => {
        dispatch(setFormOpenState(form, false));
    }

    const formStates = useSelector((store: RootState) => selectorGetUiFormStates(store));
    const dashboardCreateFormState = formStates?.find(x => x?.uiFormStateId === UiFormStateIdEnum.DashboardCreate);
    const dashboardUpdateFormState = formStates?.find(x => x?.uiFormStateId === UiFormStateIdEnum.DashboardUpdate);

    return (
        <>
            {dashboardCreateFormState?.open && (
                <ModalDashboardCreate
                    open={true}
                    onCancelCallback={() => closeForm(UiFormStateIdEnum.DashboardCreate)}
                    onCompleteCallback={() => closeForm(UiFormStateIdEnum.DashboardCreate)}
                />
            )}

            {dashboardUpdateFormState?.open && (
                <ModalDashboardUpdate
                    open={true}
                    onCancelCallback={() => closeForm(UiFormStateIdEnum.DashboardUpdate)}
                    onCompleteCallback={() => closeForm(UiFormStateIdEnum.DashboardUpdate)}
                    dashboard={dashboardUpdateFormState?.params?.dashboard}
                />
            )}
        </>
    )
}


export default LayoutGlobalForms;