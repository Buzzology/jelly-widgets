import { useDispatch, useSelector } from "react-redux";
import { UiFormStateIdEnum } from "../../@types/UiFormState";
import { RootState } from "../../redux";
import { setFormOpenState } from "../../redux/uiFormState/actions";
import { selectorGetUiFormStates } from "../../redux/uiFormState/selectors";
import ModalDashboardCreate from "../dashboards/modals/ModalDashboardCreate";

const LayoutGlobalForms = () => {

    const dispatch = useDispatch();

    const closeForm = (form: UiFormStateIdEnum) => {
        dispatch(setFormOpenState(form, false));
    }

    const formStates = useSelector((store: RootState) => selectorGetUiFormStates(store));
    const dashboardCreateFormState = formStates?.find(x => x?.uiFormStateId === UiFormStateIdEnum.DashboardCreate);

    return (
        <>
            <ModalDashboardCreate
                open={dashboardCreateFormState?.open || false}
                onCancelCallback={() => closeForm(UiFormStateIdEnum.DashboardCreate)}
                onCompleteCallback={() => closeForm(UiFormStateIdEnum.DashboardCreate)}
            />

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