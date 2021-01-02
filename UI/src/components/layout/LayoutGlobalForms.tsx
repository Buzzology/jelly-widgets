import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UiFormStateIdEnum } from "../../@types/UiFormState";
import { RootState } from "../../redux";
import { setFormOpenState } from "../../redux/uiFormState/actions";
import { selectorGetUiFormStates } from "../../redux/uiFormState/selectors";


const LayoutGlobalForms = () => {

    const dispatch = useDispatch();

    const closeForm = (form: UiFormStateIdEnum) => {
        dispatch(setFormOpenState(form, false));
    }

    const formStates = useSelector((store: RootState) => selectorGetUiFormStates(store));
    // const dashboardAddWidgetFormState = formStates?.find(x => x?.uiFormStateId === UiFormStateIdEnum.TopicCreate);

    return (
        <>
            {/* <ModalTopicCreate
                open={topicCreateFormState?.open || false}
                onCancelCallback={() => closeForm(UiFormStateIdEnum.TopicCreate)}
                onCompleteCallback={() => closeForm(UiFormStateIdEnum.TopicCreate)}
            /> */}

            {/* {dashboardAddWidgetFormState?.open && (
                <ModalDashboardAddWidget
                    open={topicUpdateFormState?.open || false}
                    topic={topicUpdateFormState?.params?.topic}
                    onCancelCallback={() => closeForm(UiFormStateIdEnum.TopicUpdate)}
                    onCompleteCallback={() => closeForm(UiFormStateIdEnum.TopicUpdate)}
                />
            )} */}
        </>
    )
}


export default LayoutGlobalForms;