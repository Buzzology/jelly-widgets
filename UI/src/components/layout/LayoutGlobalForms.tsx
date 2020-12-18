

const LayoutGlobalForms = () => {

    // const dispatch = useDispatch();

    // const closeForm = (form: UiFormStateIdEnum) => {
    //     dispatch(setFormOpenState(form, false));
    // }

    // const topicCreateFormState = formStates?.find(x => x?.uiFormStateId === UiFormStateIdEnum.TopicCreate);

    return (
        <>
        Sidebar
            {/* <ModalTopicCreate
                open={topicCreateFormState?.open || false}
                onCancelCallback={() => closeForm(UiFormStateIdEnum.TopicCreate)}
                onCompleteCallback={() => closeForm(UiFormStateIdEnum.TopicCreate)}
            />

            {topicUpdateFormState?.open && (
                <ModalTopicUpdate
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